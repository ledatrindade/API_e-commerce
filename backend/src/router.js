const express = require('express');
const router = express.Router();
const ordersController = require('./controllers/ordersController'); // Caminho correto para o controlador

// Rota para buscar todos os pedidos
router.get('/orders', ordersController.getAllOrders);

// Rota para criar um pedido
router.post('/orders', ordersController.createOrder);

// Rota para buscar pedido por ID
router.get('/orders/:id', ordersController.getOrderById);

// Rota para atualizar o status de um pedido
router.put('/orders/:id/status', ordersController.updateOrderStatus);

// Rota para deletar pedido por ID
router.delete('/orders/:id', ordersController.deleteOrder);

module.exports = router;