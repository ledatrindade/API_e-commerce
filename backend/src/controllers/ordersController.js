const ordersModel = require('../models/ordersModel');

const getAllOrders = async (_req, res) => {
    const orders = await ordersModel.getAllOrders();
    return res.status(200).json(orders);
};

const createOrder = async (req, res) => {
    const newOrder = await ordersModel.createOrder(req.body);
    return res.status(201).json(newOrder);
};

module.exports = {
    getAllOrders,
    createOrder,
};


module.exports = {
  
};