const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'seu_segredo_aqui', (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expirado' });
        }
        return res.status(401).json({ message: 'Token inválido' });
      }

      req.user = user;

      // Verificando se a role do usuário corresponde a alguma das permissões passadas
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Acesso negado' });
      }

      next();
    });
  };
};

module.exports = authMiddleware;