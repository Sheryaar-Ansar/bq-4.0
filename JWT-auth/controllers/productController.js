const Product = require("../models/Product");

exports.createProduct = async (req,res) => {
    try {
        const createProduct = await Product.create(req.body);
        res.status(201).json(createProduct)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

exports.getProducts = async(req,res) => {
    const {
        search,
        brand,
        inStock,
        category,
        minPrice,
        maxPrice,
        minRating,
        sortBy = 'name',
        order = 'asc',
        page = 1,
        pageSize = 5
    } = req.query;
    const filter = {};
    if(category) filter.category = category;
    if(brand) filter.brand = brand;
    if(inStock !== undefined) filter.inStock = inStock === 'true';

    if(minPrice || maxPrice){
        filter.price = {};
        if(minPrice) filter.price.$gte = Number(minPrice);
        if(maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if(minRating) filter.rating = {$gte: Number(minRating)}
    const sort = {}
    sort[sortBy] = order === 'desc' ? -1 : 1;
    const limit = parseInt(page - 1) * Number(pageSize);
    if(search){
        filter.$or = [
            {name: {$regex: search, $options: 'i'}},
            {description: {$regex:search, $options: 'i'}}
        ]
    }
    const total = await Product.countDocuments(filter)
    const products = await Product.find(filter)
    .sort(sort)
    .limit(limit)
    .page(page)

    res.json({
        total: total,
        page: Number(page),
        pageSize: products.length,
        products
    })

}