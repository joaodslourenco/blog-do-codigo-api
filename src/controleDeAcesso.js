const AccessControl = require("accesscontrol");
const controle = new AccessControl();

controle
  .grant("assinante")
  .readAny("post", ["id", "titulo", "conteudo", "autor"])
  .readAny("user", ["nome"]);

controle
  .grant("editor")
  .extend("assinante")
  .createOwn("post")
  .deleteOwn("post");

controle
  .grant("admin")
  .readAny("post")
  .createAny("post")
  .deleteAny("post")
  .readAny("user")
  .deleteAny("user");

module.exports = controle;
