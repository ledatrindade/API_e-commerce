const connection = require('./connection');

const getAllOrders = async () => {
    const [orders] = await connection.execute('SELECT * FROM pedido');
    return orders;
};

const createOrder = async ({ id_usuario, produtos, valor_total, id_status = 1 }) => {
    const data = new Date().toISOString().slice(0, 10); 

    // Inserção de um pedido na tabela 'pedido'
    const insertOrderQuery = `
        INSERT INTO pedido (id_usuario, valor_total, data, id_status) 
        VALUES (?, ?, ?, ?)
    `;
    const [orderResult] = await connection.execute(insertOrderQuery, [id_usuario, valor_total, data, id_status]);

    const numero_pedido = orderResult.insertId;

    // Inserção dos produtos no pedido
    const insertProductQuery = `
        INSERT INTO pedido_produto (numero_pedido, codigo_produto, quantidade) 
        VALUES (?, ?, ?)
    `;

    // Atualização do estoque
    const updateStockQuery = `
        UPDATE produto 
        SET estoque = estoque - ? 
        WHERE codigo_produto = ? AND estoque >= ?
    `;

    for (const produto of produtos) {
        const { codigo_produto, quantidade } = produto;

        // Inserir o produto no pedido
        await connection.execute(insertProductQuery, [numero_pedido, codigo_produto, quantidade]);

        // Atualizar o estoque
        const [updateResult] = await connection.execute(updateStockQuery, [quantidade, codigo_produto, quantidade]);

        // Verificar se o estoque foi atualizado
        if (updateResult.affectedRows === 0) {
            throw new Error(`Estoque insuficiente para o produto com código ${codigo_produto}`);
        }
    }

    return { numero_pedido };
};

const getOrderById = async (numero_pedido) => {
    const query = `
        SELECT p.numero_pedido, p.valor_total, p.data, 
               s.descricao AS status, 
               u.nome_usuario, 
               pr.nome_produto, pp.quantidade
        FROM pedido p
        JOIN usuario u ON p.id_usuario = u.id
        JOIN status s ON p.id_status = s.id_status
        JOIN pedido_produto pp ON p.numero_pedido = pp.numero_pedido
        JOIN produto pr ON pp.codigo_produto = pr.codigo_produto
        WHERE p.numero_pedido = ?
    `;

    const [order] = await connection.execute(query, [numero_pedido]);
    return order;
};

const deleteOrderById = async (numero_pedido) => {
    const deleteProductsQuery = 'DELETE FROM pedido_produto WHERE numero_pedido = ?';
    await connection.execute(deleteProductsQuery, [numero_pedido]);

    const deleteOrderQuery = 'DELETE FROM pedido WHERE numero_pedido = ?';
    const [result] = await connection.execute(deleteOrderQuery, [numero_pedido]);

    return result.affectedRows;
};

const updateOrderStatus = async (numero_pedido, id_status) => {
    const query = `
        UPDATE pedido 
        SET id_status = ? 
        WHERE numero_pedido = ?
    `;

    const [result] = await connection.execute(query, [id_status, numero_pedido]);
    return result.affectedRows;
};

module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    deleteOrderById,
    updateOrderStatus
};
