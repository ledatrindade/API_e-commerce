const connection = require('./connection');

const getAllOrders = async () => {
    const [orders] = await connection.execute('SELECT * FROM orders');
    return orders;
};

const createOrder = async ({ product, quantity, status = 'pendente' }) => {
    const dateUTC = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = 'INSERT INTO orders (product, quantity, status, created_at) VALUES (?, ?, ?, ?)';
    const [result] = await connection.execute(query, [product, quantity, status, dateUTC]);

    return { insertId: result.insertId };
};

//buscar pedido por id
const getOrderById = async (id) => {
    const [order] = await connection.execute('SELECT * FROM orders WHERE id = ?', [id]);
    return order[0];
};

const deleteOrderById = async (id) => {
    const [result] = await connection.execute('DELETE FROM orders WHERE id = ?', [id]);
    return result.affectedRows; 
};


module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    deleteOrderById,
};
