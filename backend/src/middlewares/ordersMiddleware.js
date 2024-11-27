const validateFieldStatus = (req, res, next) => {
    const { id_status } = req.body; 
    const validStatuses = [1, 2, 3]; 

    if (id_status === undefined || id_status === null || id_status === '') {
        return res.status(400).json({ message: 'O campo "id_status" é obrigatório.' });
    }

    if (!validStatuses.includes(id_status)) {
        return res.status(400).json({ message: `O campo "id_status" deve ser um dos seguintes (1: 'pendente', 2: 'enviado', 3: 'entregue')`});
    }

    next(); 
};

const validateFieldProduct = (req, res, next) => {
    const { id_usuario, produtos, valor_total, id_status } = req.body;
    const errors = [];

    if (!id_usuario || typeof id_usuario !== 'number' || id_usuario <= 0) {
        errors.push('O campo "id_usuario" é obrigatório e deve ser um número maior que 0.');
    }

    if (!Array.isArray(produtos) || produtos.length === 0) {
        errors.push('O campo "produtos" é obrigatório e deve ser uma lista com pelo menos um produto.');
    } else {
        produtos.forEach((produto, index) => {
           
            if (produto.codigo_produto === undefined || typeof produto.codigo_produto !== 'number' || produto.codigo_produto <= 0) {
                errors.push(`O campo "codigo_produto" é obrigatório e deve ser um número válido no item ${index + 1}.`);
            }
            if (produto.quantidade === undefined || typeof produto.quantidade !== 'number' || produto.quantidade <= 0) {
                errors.push(`O campo "quantidade" é obrigatório e deve ser um número maior que 0 no item ${index + 1}.`);
            }
        });
    }

    if (valor_total === undefined || typeof valor_total !== 'number' || valor_total <= 0) {
        errors.push('O campo "valor_total" é obrigatório e deve ser um número maior que 0.');
    }

    
    if (id_status !== undefined && (typeof id_status !== 'number' || id_status <= 0)) {
        errors.push('O campo "id_status" deve ser um número maior que 0, se fornecido.');
    }

        if (errors.length > 0) {
            return res.status(400).json({ message: 'Erro de validação', errors });
        }

    next();
};

module.exports = {
    validateFieldStatus,
    validateFieldProduct,
    
};
