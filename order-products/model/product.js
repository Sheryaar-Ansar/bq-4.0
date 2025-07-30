const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: {type:Number, required:true},
    inStock:{type:Boolean, required: true},
    createdAt: {type:Date, default: Date.now}
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product