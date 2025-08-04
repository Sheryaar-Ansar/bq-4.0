const Product = require('../models/product');

exports.getProducts = async (req, res) => {
  const {
    category,
    brand,
    inStock,
    search,
    minPrice,
    maxPrice,
    minRating,
    sortBy = 'name',
    order = 'asc',
    page = 1,
    limit = 5
  } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (brand) filter.brand = brand;
  if (inStock !== undefined) filter.inStock = inStock === 'true';

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (minRating) filter.rating = { $gte: Number(minRating) };

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const sort = {};
  sort[sortBy] = order === 'desc' ? -1 : 1;

  const skip = (parseInt(page) - 1) * parseInt(limit);


  const total = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  res.json({
    total,
    page: parseInt(page),
    pageSize: products.length,
    products
  });
};

exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    if(req.file){
        productData.img = `/uploads/${req.file.fileName}`;
    }
    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};