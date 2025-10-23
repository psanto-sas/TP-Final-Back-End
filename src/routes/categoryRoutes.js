import express from 'express';
import { createCategory, getCategories, deleteCategory, updateCategory } from '../controllers/categoryController.js';

export const categoryRoute = express.Router();

categoryRoute.post("/create", createCategory)
categoryRoute.get("/getCategories", getCategories)
categoryRoute.delete("/delete/:id", deleteCategory)
categoryRoute.put("/update/:id", updateCategory)
categoryRoute.patch("/update/:id", updateCategory)