import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { isGoodPassword } from '../utils/validators.js'

export const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        maxlength: 35,
        minLength: 2,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/, 
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(userPassword){
                return isGoodPassword(userPassword)
            }}
    },
    age: {
        type: Number,
        required : true,
        min: [16, "El usuario debe ser mayor a 16 años"], 
        max: 100
    }

}, 
{
    timestamps: true
});
userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

export default mongoose.model("user", userSchema)