const Order = require("../models/Order");

exports.getOrders = async(req,res) => {
    const orders = await Order.find();
    res.json(orders)
}

exports.createOrder = async(req,res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

exports.getOrderById = async(req,res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order) return res.status(404).json({error: 'Order Not Found'})
        res.json(order)
    } catch (error) {
        res.status(400).json({error: 'Invalid Order Id'})
    }
}

exports.updateOrderStatus = async (req,res) => {
    try {
        const {status} = req.body
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {status},
            {new:true, runValidators: true}
        )
        if(!order) return res.status(404).json({error: 'Status Not Found'})
        res.json(order)
    } catch (error) {
        res.status(400).json({error: 'Invalid Status Id'})
    }
}

exports.deleteOrderById = async (req,res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.json({message: 'Order Deleted Successfully'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}