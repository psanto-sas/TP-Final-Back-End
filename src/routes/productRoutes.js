import express from 'express';
import { createProduct, getProducts, findProductByName, findProductByID, updateProduct, deleteProduct, getStatus} from '../controllers/productController.js';

export const productRoute = express.Router();

productRoute.get("/", getProducts)
productRoute.post("/create", createProduct)
productRoute.post("/name", findProductByName)
productRoute.get("/found-by-id/:id", findProductByID)
productRoute.put("/update/:id", updateProduct)
productRoute.patch("/update/:id", updateProduct)
productRoute.delete("/delete/:id", deleteProduct)
productRoute.get("/status", getStatus)