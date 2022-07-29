const middlewaresAutorizacao = require("./autorizacao");

module.exports = (entidade, acao) => (req, res, next) => {
  if (req.estaAutenticado) {
    return middlewaresAutorizacao(entidade, acao)(req, res, next);
  }
  next();
};
