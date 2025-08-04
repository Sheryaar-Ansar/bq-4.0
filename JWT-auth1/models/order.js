const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    products: [
        {
            productId: {type:mongoose.Schema.Types.ObjectId, ref:'Product'},
            quantity: {type:Number, default:1}
        }
    ],
    status:{
        type:String,
        enum:['Pending', 'Processing', 'Shipped', 'Inqueue', 'Cancelled'],
        default: 'Pending'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order