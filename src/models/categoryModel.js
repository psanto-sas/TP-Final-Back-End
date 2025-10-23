import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        trim: true,
        minLength: 4,
        maxLength: 200,
    }

}, {
    timestamps: true
}) 
export default mongoose.model("category", categorySchema)