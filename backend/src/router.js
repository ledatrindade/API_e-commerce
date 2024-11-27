const express = require('express');
const router = express.Router();
const productsController = require('./controllers/productsController');
const ordersController = require('./controllers/ordersController');
const authController = require('./controllers/authController');
const ordersMiddleware = require('./middlewares/ordersMiddleware');
const { authenticateToken, authorizeAdmin, validateRegisterFields, validateLoginFields } = require('./middlewares/authMiddleware');

// Rota de registro de usuário
router.post('/register', validateRegisterFields, authController.registerUser);

// Rota de login de usuário
router.post('/login', validateLoginFields, authController.loginUser);

// Rotas de produtos
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);

// Rotas de pedidos (admin somente onde indicado)
router.get('/orders', authenticateToken, authorizeAdmin, ordersController.getAllOrders);
router.post('/orders', authenticateToken, ordersMiddleware.validateFieldProduct, ordersController.createOrder);
router.get('/orders/:id', authenticateToken, ordersController.getOrderById);
router.put('/orders/:id/status', authenticateToken, authorizeAdmin, ordersMiddleware.validateFieldStatus, ordersController.updateOrderStatus);
router.delete('/orders/:id', authenticateToken, authorizeAdmin, ordersController.deleteOrder);

module.exports = router;

