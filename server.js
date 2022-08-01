require("dotenv").config();
const app = require("./app");
const port = 3000;
require("./database");
const { InvalidArgumentError } = require("./src/erros");
require("./redis/blocklist-access-token");
require("./redis/allowlist-refresh-token");
const jwt = require("jsonwebtoken");

const routes = require("./rotas");
routes(app);

app.use((error, req, res, next) => {
  let status = 500;
  const corpo = {
    message: error.message,
  };

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
  res.status(status).json(corpo);
});

app.listen(port, () => console.log(`App listening on port ${port}`));
