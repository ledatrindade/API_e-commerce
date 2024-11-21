const connection = require('./connection');

const getAllProducts = async () => {
    const [products] = await connection.execute('SELECT * FROM produto');
    return products;
};

const getProductById = async (codigo_produto) => {
    const query = 'SELECT * FROM produto WHERE codigo_produto = ?';
    const [product] = await connection.execute(query, [codigo_produto]);
    return product[0]; 
};


module.exports = {
    getAllProducts,
    getProductById,
};


