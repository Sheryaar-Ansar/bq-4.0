const { createOrder, getMyOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController')
const express = require('express')
const authenticateUser = require('../middlewares/auth')
const router = express.Router()

router.post('/', authenticateUser, createOrder)
router.get('/', authenticateUser, getMyOrders)
router.get('/:id', authenticateUser, getOrderById),
// router.put('/:id/:status', authenticateUser, updateOrderStatus)

module.exports = router

