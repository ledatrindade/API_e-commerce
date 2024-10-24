const ordersModel = require('../models/ordersModel');

// Função para buscar todos os pedidos
const getAllOrders = async (_req, res) => {
    try {
        const orders = await ordersModel.getAllOrders();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar pedidos.' });
    }
};

// Função para criar um pedido
const createOrder = async (req, res) => {
    try {
        const newOrder = await ordersModel.createOrder(req.body);
        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar pedido.' });
    }
};

// Função para buscar pedido por ID
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

// Função para deletar pedido por ID
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await ordersModel.deleteOrderById(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado.' });
        }
        return res.status(204).send('Pedido deletado com sucesso.');
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar pedido.' });
    }
};

const updateOrderStatus = async (req, res) => {
    const { id } = req.params; // Pega o ID do pedido
    const { id_status } = req.body; // Pega o novo status do corpo da requisição

    const affectedRows = await ordersModel.updateOrderStatus(id, id_status);

    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
    }

    return res.status(200).json({ message: 'Status do pedido atualizado com sucesso.' });
};

// Exporta as funções do controlador
module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    deleteOrder,
    updateOrderStatus,
};