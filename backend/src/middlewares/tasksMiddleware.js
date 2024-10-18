const validateFieldProduct = (req, res, next) => {
    const { product } = req.body;

    if (!product || typeof product !== 'string' || product.trim() === '') {
        return res.status(400).json({ message: 'O campo "product" é obrigatório e deve ser uma string válida.' });
    }

    next();
};

const validateFieldQuantity = (req, res, next) => {
    const { quantity } = req.body;

    if (quantity === undefined || typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ message: 'O campo "quantity" é obrigatório e deve ser um número maior que 0.' });
    }

    next();
};

const validateFieldStatus = (req, res, next) => {
    const { status } = req.body;
    const validStatuses = ['pendente', 'confirmado', 'cancelado'];

    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ message: `O campo "status" deve ser um dos seguintes: ${validStatuses.join(', ')}` });
    }

    next();
};

module.exports = {
    validateFieldProduct,
    validateFieldQuantity,
    validateFieldStatus,
};
