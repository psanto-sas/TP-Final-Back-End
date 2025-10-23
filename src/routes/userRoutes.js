import express from 'express';
import { createUser, getUsers, deleteUser, updateUser, validateUser } from '../controllers/userController.js'
import { verifyTokenMW } from '../middlewares/verifyTokenMW.js';

export const userRoute = express.Router();

userRoute.post("/create", createUser)
userRoute.get("/getUsers", getUsers)
userRoute.delete("/deleteUser/:id", deleteUser)
userRoute.put("/updateUser/:id", updateUser)
userRoute.patch("/updateUser/:id", updateUser)
userRoute.post("/login", validateUser)