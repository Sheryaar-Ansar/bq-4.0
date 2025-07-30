
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {type:String, required:true, text:true},
    category: {type:String, required:true, text:true},
    description:{type:String, text:true},
    brand:{type:String, text:true},
    price:{type:Number, required:true},
    inStock:{type:Boolean, default:true},
    rating:{type:Number, default: 0},
    createdAt:{type:Date, default:Date.now}
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;