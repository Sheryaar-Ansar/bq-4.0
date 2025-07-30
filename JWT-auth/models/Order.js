const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    products: [
        {
            productId: {type:mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: {type:Number, default: 1}
        }
    ],
    status: {
        type:String,
        default: 'Pending',
        enum: ['Pending', 'Processing', 'Shipped', 'Cancelled']
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order;