const Order = require("../models/order");
const User = require("../models/user");


exports.createOrder = async (req,res) => {
    try {
        const order = await Order.create({...req.body, user:req.user.id});
        res.status(201).json(order)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

exports.getMyOrders = async (req,res) =>{
    const order = await Order.findOne({user:req.user.id}).populate('products.productId')
    res.json(order)
}
exports.getOrderById = async (req,res) => {
    try {
        const order = await User.findOne({_id:req.params.id, user:req.user.id}).populate('products.productId')
        if(!order) return res.status(404).json({error:'You are not authorized OR order not found'})
        res.json(order)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}