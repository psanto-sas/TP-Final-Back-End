import Product, { statusEnum } from "../models/productModel.js"

export const createProductService = async (productData) =>{
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    return savedProduct;
}

export const getProductsService = async () => {
    const products = await Product.find().populate("category");
        if(products.length === 0){
          const error = new Error("No hay productos")
          error.statusCode = 204;
          throw error
        };
    return products
};

export const findProductByNameService = async (name) => {
    const productExist = await Product.find({
        name: { $regex: name, $options: 'i' }
    });

      if (!productExist) {
        const error = new Error( `El producto: ${name} no existe`);
        error.statusCode = 400;
        throw error;
      };

    return { productExist};
};

export const findProductByIDService = async (productID) => {
    
    const productExist = await Product.findOne({ _id: productID })

      if (!productExist){
        const error = new Error(`El producto ${productID} no existe`)
        error.statusCode = 400;
        throw error;        
      }
    return { productExist }
};

export const updateProductService = async (productID, updateData) =>{
    const productExist = await Product.findOne({ _id: productID })

      if(!productExist){
        const error = new Error("El producto que estás tratando de modificar no existe");
        error.statusCode = 400
        throw error
      };
    
      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: productID },
        updateData,
        {new: true}
    )
    return updatedProduct;
};


export const deleteProductService = async (productID) => {
    const productExist = await Product.findOne({ _id: productID });
      if(!productExist){
        const error = new Error("El producto que estás tratando de eliminar no existe");
        error.statusCode = 400
        throw error
      };

      const deletedProduct = await Product.findByIdAndDelete(productID);

      return { message: "Producto eliminado", deletedProduct }
}

export const getStatusService = async () =>{
    return statusEnum;
};