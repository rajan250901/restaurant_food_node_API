const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddlewares');
const {getAllOrders, createOrder, getOrderById, deleteOrderById} = require('../controllers/orderController');

router.get('/getallorders', authMiddleware, getAllOrders);
router.post('/createorders', authMiddleware, createOrder);
router.post('/getorderbyid', authMiddleware, getOrderById);
router.post('/deleteorderbyid', authMiddleware, deleteOrderById);

module.exports =router;