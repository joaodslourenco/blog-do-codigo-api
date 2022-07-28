module.exports = (cargosObrigatorios) => (req, res, next) => {
  if (cargosObrigatorios.indexOf(req.user.cargo) === -1) {
    console.log("rota bloqueada");
    res.status(403).end();
    return;
  }

  next();
};
