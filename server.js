require("dotenv").config();
const app = require("./app");
const port = 3000;
require("./database");
const {
  InvalidArgumentError,
  NotFoundError,
  NotAuthorizedError,
} = require("./src/erros");
require("./redis/blocklist-access-token");
require("./redis/allowlist-refresh-token");
const jwt = require("jsonwebtoken");
const { ConversorErro } = require("./src/conversores");
const routes = require("./rotas");

app.use((req, res, next) => {
  res.set({
    "Content-Type": "application/json",
  });
  next();
});

routes(app);

app.use((error, req, res, next) => {
  const conversor = new ConversorErro("json");
  let status = 500;
  const corpo = {
    message: error.message,
  };

  if (error instanceof NotFoundError) {
    status = 404;
  }

  if (error instanceof NotAuthorizedError) {
    status = 401;
  }
  if (error instanceof InvalidArgumentError) {
    status = 400;
  }

  if (error instanceof jwt.JsonWebTokenError) {
    status = 401;
  }
  if (error instanceof jwt.TokenExpiredError) {
    status = 401;
    corpo.expiradoEm = error.expiredAt;
  }

  res.status(status).send(conversor.converter(corpo));
});

app.listen(port, () => console.log(`App listening on port ${port}`));
