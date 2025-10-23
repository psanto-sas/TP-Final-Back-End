import mongoose from "mongoose";
import { MONGODB_URI, ECOMMERCE_DB} from "./config.js";

export const connectDB = async() =>{
    try {
        await mongoose.connect(`${MONGODB_URI}/${ECOMMERCE_DB}`)
        console.log("DB conectada")
    } catch (error) {
        console.log("Error al conectar DB", error);
        // Terminar ejecución
        process.exit(1)
    }
}