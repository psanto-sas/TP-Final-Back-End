import { createCategoryService, getCategoriesService, deleteCategoryService, updateCategoryService} from '../services/categoryService.js';


export const createCategory = async (request, response) => {
    try {
        const name = request.body.name;
        console.log({ request })
        const savedCategory = await createCategoryService(name);
        return response.status(201).json({ message: "Nueva Categoría creada", data: savedCategory })
    
    } catch (error) {
            return response.status(500).json({ message: "Internal Server Error", error: error.message })      
    }
};

export const getCategories = async (request, response) => {
    try {
        const categories = await getCategoriesService();
        return response.status(200).json(categories);

    } catch (error) {
        if (error.statusCode === 204) {
            return response.sendStatus(204)
        }
        return response.status(500).json({ message: "Internal server Error", error: error.message })
    }
};

export const deleteCategory = async (request, response) => {
    try {
        const categoryID = request.params.id;
        const deletedCategory = await deleteCategoryService(categoryID);
        return response.status(200).json(deletedCategory);

    } catch (error) {
        if (error.statusCode === 400) {
            return response.status(error.statusCode).json({ message: error.message })
        }
        return response.status(500).json({ message: "Internal Server Error", error: error.message })
    }
};

export const updateCategory = async (request, response) => {
    try {
        const categoryID = request.params.id;
        
        const updatedCategory = await updateCategoryService(categoryID, request.body);
        response.status(201).json(updatedCategory);

    } catch (error) {
        if (error.statusCode === 400) {
           return response.status(400).json({ message: error.message }) 
        }        
        return response.status(500).json({ message: "Internal Server Error", error: error.message })
}
};
