const express = require('express');
const router = express.Router();
const ordersController = require('./controllers/ordersController'); 
const middleWare = require('./middlewares/ordersMiddleware');
const productsController = require('./controllers/productsController');

// Rota para listar todos os produtos
router.get('/products', productsController.getAllProducts);

// Rota para obter os detalhes de um produto específico
router.get('/products/:id', productsController.getProductById);

// Rota para buscar todos os pedidos
router.get('/orders', ordersController.getAllOrders);

// Rota para criar um pedido
router.post('/orders', middleWare.validateFieldProduct, ordersController.createOrder);

// Rota para buscar pedido por ID
router.get('/orders/:id', ordersController.getOrderById);

// Rota para atualizar o status de um pedido
router.put('/orders/:id/status', middleWare.validateFieldStatus, ordersController.updateOrderStatus);

// Rota para deletar pedido por ID 
router.delete('/orders/:id', ordersController.deleteOrder);


module.exports = router;