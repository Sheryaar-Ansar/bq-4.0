const { getOrders, createOrder, getOrderById, updateOrderStatus, deleteOrderById } =require('../controllers/orderController')
const express = require('express')
const router = express.Router()

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.patch('/:id/:status', updateOrderStatus);
router.delete('/:id', deleteOrderById);

module.exports = router