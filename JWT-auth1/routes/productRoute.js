const { createProduct, getProducts } =require('../controllers/productController')
const express =require('express')
const validate = require('../middlewares/validate')
const { productValidate } = require('../validators/product')
const upload = require('../middlewares/upload')
const router = express.Router()

router.post('/', upload.single('image'), validate(productValidate), createProduct);
router.get('/', getProducts)

module.exports = router