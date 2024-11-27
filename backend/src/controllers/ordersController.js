const ordersModel = require('../models/ordersModel');

const getAllOrders = async (_req, res) => {
    try {
        const orders = await ordersModel.getAllOrders();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar pedidos.' });
    }
};

const createOrder = async (req, res) => { 
    try {
        const newOrder = await ordersModel.createOrder(req.body);
        return res.status(201).json(newOrder);
    } catch (error) {
        // Verifica se o erro é de estoque insuficiente
        if (error.message.startsWith('Estoque insuficiente')) {
            return res.status(400).json({ message: error.message }); // Retorna erro específico
        }
        // Retorna mensagem genérica para outros erros
        return res.status(500).json({ message: 'Erro ao criar pedido.' });
    }
};
const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await ordersModel.getOrderById(id);
        if (!order || order.length === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado.' });
        }
        return res.status(200).json(order);
        
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar pedido.' });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await ordersModel.deleteOrderById(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado.' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar pedido.' });
    }
};

const updateOrderStatus = async (req, res) => {
    const { id } = req.params; 
    const { id_status } = req.body; 

    const affectedRows = await ordersModel.updateOrderStatus(id, id_status);

    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
    }

    return res.status(200).json({ message: 'Status do pedido atualizado com sucesso.' });
};

module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    deleteOrder,
    updateOrderStatus,
};