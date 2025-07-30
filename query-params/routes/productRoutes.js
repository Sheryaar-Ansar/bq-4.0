const express = require('express')
const router = express.Router()
const { getProducts, createProduct } = require('../controller/productController')
const { validateProduct } = require('../validators/product')
const validate = require('../middlewares/validate')

router.post('/', validate(validateProduct), createProduct);
router.get('/', getProducts);

module.exports = router