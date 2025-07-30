const Order = require("../model/order");

exports.createOrder = async (req,res) => {
    try {
        const createOrder = await Order.create(req.body);
        res.status(201).json(createOrder)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.getOrders = async(req,res) => {
    const getOrders = await Order.find().populate('products.productId');
    res.json(getOrders)
}

exports.getOrderById = async(req,res) => {
    try {
        const orderById = await Order.findById(req.params.id);
        if(!orderById) return res.status(404).json({error: 'Order Not Found'})
        res.json(orderById)
    } catch (error) {
     res.status(400).json({error: 'Order ID Not Valid'})   
    }
}

exports.updateOrderStatus = async(req,res) => {
    try {
        const { status } = req.body
        const updateOrderStatus = await Order.findByIdAndUpdate(
            req.params.id,
            {status},
            {new:true, runValidators:true}
        )
        if(!updateOrderStatus) return res.status(404).json({error: 'Order Not Found'})
        res.json(updateOrderStatus)
    } catch (error) {
        res.status(400).json({error: 'Order ID Not Valid'})
    }
}