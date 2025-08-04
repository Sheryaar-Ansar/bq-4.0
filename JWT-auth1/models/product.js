const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {type:String, required:true, text:true},
    category: {type:String, required:true, text:true},
    brand:{type:String, text:true},
    description:{type:String, text:true},
    price:{type:Number, required:true},
    minRating:{type:Number, default:0},
    inStock:{type:Boolean, default:true},
    img:String,
    createdAt: {type:Date, default:Date.now}
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product