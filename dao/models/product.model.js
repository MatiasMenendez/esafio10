import mongoose from "mongoose"

const collection = 'products'

const productSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    title:String,
    description:String,
    code: String,
    price: Number,
        
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails:String
        
})

const productModel = mongoose.model(collection, productSchema)

export default productModel