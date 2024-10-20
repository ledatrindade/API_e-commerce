const express = require('express');

const ordersController = require('./controllers/ordersController');
const ordersMiddleware = require('./middlewares/ordersMiddleware');

const router = express.Router();

// Rotas de Orders
router.get('/orders', ordersController.getAllOrders);
router.post(
    '/orders',
    ordersMiddleware.validateFieldProduct,
    ordersMiddleware.validateFieldQuantity,
    ordersMiddleware.validateFieldStatus,
    ordersController.createOrder
);

module.exports = router;