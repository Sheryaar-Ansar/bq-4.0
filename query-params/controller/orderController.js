const Order = require("../model/order");

exports.createOrder = async(req,res) => {
    try {
        const order = await Order.create(req.body)
        res.status(201).json(order)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
exports.getOrders = async (req,res) => {
    const order = await Order.find()
    res.json(order)
}

exports.getOrderById = async (req,res) => {
    try {
        const order = await Order.findById(req.params.id)
        if(!order) return res.status(404).json({error: 'Order Not Found'})
        res.json(order)
    } catch (error) {
        res.status(400).json({error: error.message})
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
        if(!order) return res.status(404).json({error: 'Order Not Found'})
        res.json(order)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}