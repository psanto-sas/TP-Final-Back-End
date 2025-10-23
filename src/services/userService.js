import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserIDandCheck } from "../utils/findUserHelper.js";
import {SECRET} from "../config/config.js"

export const createUserService = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });

    if(existingUser){
        throw new Error("Ya existe un usuario con este Email")
    }
    const newUser = new User(userData);

    await newUser.save();

    return { message: "Usuario creado" }
}

export const getUsersService = async () => {
    const users = await User.find(); 
      if(users.length === 0){
        const error = new Error("No hay usuarios");
        error.statusCode = 204;
        throw error;
        };

    return users;
}

export const deleteUserService = async (userID) => {
    await findUserIDandCheck(userID);
    
    await User.findByIdAndDelete(userID);
    return { message: "Usuario eliminado" };
};

export const updateUserService = async (userID, updateData) =>{
    await findUserIDandCheck(userID);
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10)
      }
    const updatedUser = await User.findOneAndUpdate({ _id: userID }, updateData, {new: true} );
    
    return updatedUser;
};

export const validateUserService = async (email, password) => {
    console.log({email, password});

    if (!(email && password)) {
        const error = new Error("Hay un campo de datos faltante");
        error.statusCode = 404;
        throw error;
    };

    const userFound = await User.findOne({email});
    console.log(userFound);

    if(!userFound){
        const error = new Error("Email o Contraseña incorrectos");
        error.statusCode = 400;
        throw error;
    };

    if (!bcrypt.compareSync(password, userFound.password)) {
        const error = new Error("Contraseña incorrecta");
        error.statusCode = 400;
        throw error;
    };
    
    
    const payload = {
        userID: userFound._id,
        userEmail: userFound.email
    };
    
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

    return { message: "Sesion iniciada", token}
};
