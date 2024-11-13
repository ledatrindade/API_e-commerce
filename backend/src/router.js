const express = require('express');
const router = express.Router();
const ordersController = require('./controllers/ordersController');
const middleWare = require('./middlewares/ordersMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');

// Rota para buscar todos os pedidos (somente admin)
router.get('/orders', authMiddleware(['admin']), ordersController.getAllOrders);

// Rota para criar um pedido (qualquer usuário logado)
router.post('/orders', authMiddleware(['user', 'admin']), middleWare.validateFieldProduct, ordersController.createOrder);

// Rota para buscar pedido por ID (qualquer usuário logado)
router.get('/orders/:id', authMiddleware(['user', 'admin']), ordersController.getOrderById);

// Rota para atualizar o status de um pedido (somente admin)
router.put('/orders/:id/status', authMiddleware(['admin']), middleWare.validateFieldStatus, ordersController.updateOrderStatus);

// Rota para deletar pedido por ID (somente admin)
router.delete('/orders/:id', authMiddleware(['admin']), ordersController.deleteOrder);

module.exports = router;