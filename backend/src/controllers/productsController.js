const productsModel = require('../models/productsModel');


const getAllProducts = async (_req, res) => {
    const products = await productsModel.getAllProducts();
    return res.status(200).json(products);
};


const getProductById = async (req, res) => {
    const { id } = req.params; 
    const product = await productsModel.getProductById(id);

    if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    return res.status(200).json(product);
};


module.exports = {
    getAllProducts,
    getProductById,
};
