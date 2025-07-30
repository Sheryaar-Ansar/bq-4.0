const mongoose  = require("mongoose")

const productSchema = mongoose.Schema({
    name: {type:String, required:true, text:true},
    price: {type:Number, required:true},
    category:{type:String, required:true},
    description:{type:String, text:true},
    brand:{type:String},
    inStock:{type:Boolean, default: true},
    minRating:{type:Number, default:0},
    createdAt:{type:Date, default:Date.now}
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product