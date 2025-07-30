const Product = require("../model/product");

exports.createProduct = async(req, res) =>{
    try {
        const createProduct = await Product.create(req.body);
        res.status(201).json(createProduct)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.getProducts = async (req, res) => {
    const getProducts = await Product.find();
    res.json(getProducts)
}