const express = require('express');
const ordersModel = require('../models/ordersModel');
const router = express.Router();

const getAllOrders = async (_req, res) => {
    const orders = await ordersModel.getAllOrders();
    return res.status(200).json(orders);
};

const createOrder = async (req, res) => {
    const newOrder = await ordersModel.createOrder(req.body);
    return res.status(201).json(newOrder);
};


const getOrderById = async (req, res) => {
    const { id } = req.params;
    const order = await ordersModel.getOrderById(id);

    if (!order) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
    }

    return res.status(200).json(order);
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const affectedRows = await ordersModel.deleteOrderById(id);

    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
    }

    return res.status(204).send('Pedido deletado com sucesso.'); 
};


module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    deleteOrder,
};


module.exports = router;
