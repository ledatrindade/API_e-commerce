const jwt = require('jsonwebtoken');

const validateRegisterFields = (req, res, next) => {
    const { nome_usuario, email, senha } = req.body;
    const errors = [];


    if (!nome_usuario || typeof nome_usuario !== 'string' || nome_usuario.trim().length === 0) {
        errors.push('O campo "nome_usuario" é obrigatório e deve ser uma string válida.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        errors.push('O campo "email" é obrigatório e deve ser um email válido.');
    }

    if (!senha || typeof senha !== 'string' || senha.length < 8) {
        errors.push('O campo "senha" é obrigatório e deve ter pelo menos 8 caracteres.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Erro de validação', errors });
    }

    next(); 
};

const validateLoginFields = (req, res, next) => {
    const { email, senha } = req.body;
    const errors = [];


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        errors.push('O campo "email" é obrigatório e deve ser um email válido.');
    }


    if (!senha || typeof senha !== 'string' || senha.length < 8) {
        errors.push('O campo "senha" é obrigatório e deve ter pelo menos 8 caracteres.');
    }

 
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Erro de validação', errors });
    }

    next(); 
};

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido.' });
        req.user = user;
        next();
    });
};

const authorizeAdmin = (req, res, next) => {
    if (req.user.tipo_usuario !== 'admin') {
        return res.status(403).json({ message: 'Acesso restrito a administradores.' });
    }
    next();
};

module.exports = { authenticateToken, authorizeAdmin, validateRegisterFields, validateLoginFields };
