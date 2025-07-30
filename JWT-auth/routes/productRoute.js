const { getProducts, createOrder } = require('../controllers/productController')
const express = require('express');
const validate = require('../middlewares/validate');
const { validateProducts } = require('../validators/product');
const router = express.Router()

router.post('/', validate(validateProducts), createOrder);
router.get('/', getProducts);

module.exports = router;