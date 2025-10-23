import Category from '../models/categoryModel.js';

export const createCategoryService = async (name, description) => {
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();
    return savedCategory;
}
export const getCategoriesService = async () =>{
    const categories = await Category.find();

      if ( categories.length === 0) {
        const error = new Error("No hay categorias por el momento");
        error.statusCode = 204;
        throw error;
      };
    return categories;
};

export const deleteCategoryService = async(id) =>{
    const categorySearch= await Category.findOne({ _id: id });

      if (!categorySearch) {
        const error = new Error(`La categoria con ID ${id} no existe`)
        error.statusCode = 404;
        throw error;
      }
    const deletedCategory = await Category.deleteOne({ _id: id });
    return { 
    message: `Categoria ${categorySearch.name} eliminada correctamente`, 
    id: categorySearch._id };
};

export const updateCategoryService = async(categoryID, updateData) =>{
    const categorySearch = await Category.findOne({ _id: categoryID });

      if (!categorySearch) {
        const error = new Error('La categoria que estás buscando actualizar no existe');
        error.statusCode = 404;
        throw error
      }
    const updatedCategory = await Category.findByIdAndUpdate(
          { _id: categoryID },
            updateData,
            {new: true})

    return updatedCategory
};