import  { createUserService, getUsersService, deleteUserService, updateUserService, validateUserService } from '../services/userService.js';

export const createUser = async (request, response) =>{
    try {
        const res = await createUserService(request.body);
        response.status(201).json(res)
    } catch (error) {
        return response.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

export const getUsers = async (request, response) => {
    try {
        const users = await getUsersService();
        response.status(200).json(users);

    } catch (error) {
        console.log({error})

        if (error.statusCode === 204) {
            return res.sendStatus(error.statusCode);
        };
        return response.status(500).json({ message: "Internal Server Error", error: error.message });
    };
}

export const deleteUser = async (request, response) => {
    try {
        const userID = request.params.id;
        const result = await deleteUserService(userID);
        return response.status(200).json(result)
    } catch (error) {
        if (error.statusCode === 404) {
              return response.status(404).json({ message: error.message })
        }
        return response.status(500).json({ message: "Internal Server Error", error: error.message })
    }
};

export const updateUser = async (request, response)=> {
    try {
        const userID = request.params.id;
        
        const updatedUser = await updateUserService(userID, request.body);
        
        console.log(updatedUser, "desde el controller");
        return response.status(201).json(updatedUser)
        
    } catch(error){
        if (error.statusCode === 404) {
            return response.status(404).json({ message: error.message })
        }
        return response.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

export const validateUser = async (request, response) => {
    try {
        const { email, password } = request.body;
        const result = await validateUserService(email, password);

        console.log({result});
        return response.status(200).json(result);
    } catch (error) {
        if (error.statusCode === 400) {
            return response.status(error.statusCode).json({message: error.message});
        }
        return response.status(500).json({message: "Internal Server Error", error: error.message})       
    }
};





