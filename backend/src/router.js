const express = require('express');
const ordersController = require('./controllers/ordersController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');

const router = express.Router();

router.post(
    '/orders',
    tasksMiddleware.validateFieldProduct,
    tasksMiddleware.validateFieldQuantity,
    tasksMiddleware.validateFieldStatus,
    ordersController.createOrder
);

module.exports = router;