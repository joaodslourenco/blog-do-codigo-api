module.exports = (cargosObrigatorios) => (req, res, next) => {
  req.user.cargo = "admin";
  if (cargosObrigatorios.indexOf(req.user.cargo) === -1) {
    console.log("rota bloqueada");
    res.status(403).end();
    return;
  }

  next();
};
