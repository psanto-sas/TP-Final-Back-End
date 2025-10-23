import User from "../models/userModel.js";

export const findUserIDandCheck = async (userID) => {
    const userExist = await User.findOne({ _id: userID })

      if(!userExist) {
          const error = new Error("Usuario no encontrado");
          error.statusCode = 404;
          throw error;
      }

    return userExist; 
};