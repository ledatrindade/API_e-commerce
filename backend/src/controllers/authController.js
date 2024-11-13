const jwt = require('jsonwebtoken');

const login = (req, res) => {
  console.log('Requisição recebida no login');  // Log para confirmar que a função é chamada
  console.log('Corpo da requisição:', req.body);  // Log do corpo da requisição para depuração

  const { email, password } = req.body;

  // Verifique as credenciais de login (você pode substituir isso por uma consulta ao banco de dados)
  if (email === 'admin@exemplo.com' && password === 'senha123') {
    // Definindo o usuário como admin
    const user = { name: 'Admin', email: 'admin@exemplo.com', role: 'admin' };
    const token = jwt.sign(user, 'seu_segredo_aqui', { expiresIn: '1h' });
    console.log('Token gerado:', token);  // Log do token gerado
    return res.json({ token });
  }

  if (email === 'usuario@exemplo.com' && password === 'senha123') {
    // Definindo o usuário como comum (user)
    const user = { name: 'João', email: 'usuario@exemplo.com', role: 'user' };
    const token = jwt.sign(user, 'seu_segredo_aqui', { expiresIn: '1h' });
    console.log('Token gerado:', token);  // Log do token gerado
    return res.json({ token });
  }

  console.log('Credenciais inválidas');  // Log para credenciais inválidas
  return res.status(400).json({ message: 'Credenciais inválidas' });
};

module.exports = { login };