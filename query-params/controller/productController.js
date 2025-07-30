const Product = require("../model/product");

exports.getProducts = async (req,res) => {
    const {
        search,
        category,
        brand,
        inStock,
        minPrice,
        maxPrice,
        minRating,
        order = 'asc',
        sortBy = 'name',
        page = 1,
        pageSize = 5
    } = req.query;

    const filter = {};
    if(category) filter.category = category;
    if(brand) filter.brand = brand;
    if(inStock !==undefined) filter.inStock = inStock === 'true';

    if(minPrice || maxPrice){
        filter.price = {};
        if(minPrice) filter.price.$gte = minPrice;
        if(maxPrice) filter.price.$lte = maxPrice;
    }
    if(search){
      filter.$or = [
        {name: {$regex: search, $options:'i'}},
        {description: {$regex: search, $options:'i'}}
      ]
    }
    if(minRating) filter.rating = {$gte: Number(minRating)}

    const sort = {};
    sort[sortBy] = order === 'desc' ? -1 : 1;

    const skip = (parseInt(page - 1)) * (parseInt(pageSize));
    const total = await Product.countDocuments(filter)

    const products = await Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(pageSize)

    res.json({
      total,
      page: Number(page),
      pageSize: products.length,
      products
    })
}

exports.createProduct = async(req,res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product)
  } catch (error) {
    res.status(400).status({error: error.message})
  }
}