const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../models/connection');

const registerUser = async (req, res) => {
    const { nome_usuario, email, senha, tipo_usuario } = req.body;

    if (!nome_usuario || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const query = 'INSERT INTO usuario (nome_usuario, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)';
    await connection.execute(query, [nome_usuario, email, hashedPassword, tipo_usuario || 'cliente']);

    return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
};

const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha ) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const query = 'SELECT * FROM usuario WHERE email = ?';
    const [users] = await connection.execute(query, [email]);

    if (users.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const user = users[0];

    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
        { id: user.id, tipo_usuario: user.tipo_usuario },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
};

module.exports = { registerUser, loginUser };
