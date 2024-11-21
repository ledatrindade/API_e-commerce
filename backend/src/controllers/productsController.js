const productsModel = require('../models/productsModel');

// Controlador para listar todos os produtos
const getAllProducts = async (_req, res) => {
    const products = await productsModel.getAllProducts();
    return res.status(200).json(products);
};

// Controlador para obter um produto específico pelo ID
const getProductById = async (req, res) => {
    const { id } = req.params; // Pega o ID do produto da URL
    const product = await productsModel.getProductById(id);

    if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    return res.status(200).json(product);
};

// Exporte as novas funções
module.exports = {
    getAllProducts,
    getProductById,
};
