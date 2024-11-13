const express = require('express');
const router = require('./router');
const { login } = require('./controllers/authController');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Middleware para analisar JSON
app.use(express.json());

// Rota de login
app.post('/login', login);

// Rota pública de produtos (sem autenticação)
app.get('/produtos', (req, res) => {
  res.send('Lista de produtos');
});

// Rota para "meus pedidos" com middleware de autenticação
app.get('/meus-pedidos', authMiddleware(['user', 'admin']), (req, res) => {
  res.send(`Bem-vindo, ${req.user.name}. Aqui estão seus pedidos.`);
});

// Rota de pedidos com autenticação (usando o router)
app.use('/orders', authMiddleware(['user', 'admin']), router);

// Definindo a porta do servidor (3000 por padrão)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;