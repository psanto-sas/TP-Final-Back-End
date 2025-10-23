import { createProductService, getProductsService, getStatusService, findProductByIDService, findProductByNameService, updateProductService, deleteProductService } from '../services/productService.js';

export const createProduct = async (request, response) => {
    try {
        const savedProduct = await createProductService(request.body);
        return response.status(200).json(savedProduct);

    } catch (error) {
    return response.status(500).json({ message: "Internal Server Error", error: error.message });
}
};

export const getProducts = async (request, response) => {
    try {
        const products = await getProductsService();
        return response.status(200).json(products)

    } catch (error) {
        if (error.statusCode === 204) {
            return response.sendStatus(204);
        };
        if (error.statusCode === 400) {
            return response.status(400).json({ message: error.message})
        }
    }
};

export const findProductByName = async (request, response) =>{
    try {
        const product = await findProductByNameService(request.body.name)
        return response.status(200).json(product);

    } catch (error) {
        if (error.statusCode === 400) {
            return response.status(400).json({ message: error.message })
        }
        return response.status(500).json({ message: "Internal Server Error"})
    }
};

export const findProductByID = async (request, response) =>{
    try {
        const product = await findProductByIDService(request.params.id);
        return response.status(200).json(product);

    } catch (error) {
        if (error.statusCode === 400) {
            return response.statuus(400).json({ message: error.message })
        }
        return response.status(500).json({ mesage: "Internal Server Error", error: error.message })
    }
};

export const updateProduct = async (request, response) => {
    try {
        const productID = request.params.id;
        const updatedProduct = await updateProductService(productID, request.body)
        response.status(201).json(updatedProduct);

    } catch (error) {
        if (error.statusCode === 400) {
           return response.status(400).json({ message: error.message }) 
        }        
        return response.status(500).json({ message: "Internal Server Error", error: error.message })
    }
};

export const deleteProduct = async (request, response) => {
    try {
        const productID = request.params.id;
        const deletedProduct = await deleteProductService(productID)
        response.status(201).json(deletedProduct);

    } catch (error) {
        if (error.statusCode === 400) {
            return response.status(400).json({ message: error.message })
        }
        return response.status(500).json({ message: "Internal Server Error", error: error.message})
    }
};

export const getStatus = async (request, response) => {
    try {
        const status = await getStatusService();
        return response.status(200).json(status);

    } catch (error) {
        return response.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}