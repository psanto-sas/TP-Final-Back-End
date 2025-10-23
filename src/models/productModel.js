import mongoose from "mongoose";

export const statusEnum = ["Disponible", "No disponible"]

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: 4,
        required: [true, "Se necesita un Nombre único"],
        trim: true,
        unique: true
    },
    price:{
        type: Number,
        required: [true, "Se requiere un Precio"],
        min: [1, "El Precio no puede ser menor a 1"],
        trim: true
    },
    profitRate: {
        type: Number,
        default: 1.1,
        min: 1,
        required: true
    },
    description:{
        type: String,
        minLength: 5,
        maxLength: 600 
    },
    stock:{
        type: Number,
        default: 0,
        min: [0, "El Stock no puede ser negativo"],
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "category"
    },
    status:{
        type: String,
        validate: {
            validator: function(status){
                return statusEnum.includes(status)
            },
            message: props => `${props.value} no es un estado valido`
        },
        required: [true, "Se necesita un Estado(Disponible o No Disponible)"]
    }
});

productSchema.methods.decreaseStock = async function (amount) {
    if(amount <= 0){
        throw new Error("La cantidad de Stock tiene que ser 0 o mayor")
    }
    if (this.stock < amount) {
        throw new Error("No hay suficiente Stock")
    }
    this.stock -= amount 
    await this.save();
};

productSchema.virtual("priceWithProfitRate").get(function () {
    return this.price * this.profitRate
})
productSchema.set("toJSON", {virtuals: true})
productSchema.set("toObject", {virtuals: true})

export default mongoose.model("product", productSchema)