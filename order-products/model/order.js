const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: {type: Number, required: true}
        }
    ],
    status:{
        type: String,
        default: 'pending',
        enum:['pending', 'processing', 'shipped', 'cancelled']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order