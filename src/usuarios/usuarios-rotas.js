const usuariosControlador = require("./usuarios-controlador");
const middlewaresAutenticacao = require("./middlewares-autenticacao");
const middlewaresAutorizacao = require("../middlewares/autorizacao");

module.exports = (app) => {
  app
    .route("/usuario/recuperar_senha")
    .post(usuariosControlador.recuperarSenha);

  app
    .route("/usuario/atualiza_token")
    .post(middlewaresAutenticacao.refresh, usuariosControlador.login);

  app
    .route("/usuario/login")
    .post(middlewaresAutenticacao.local, usuariosControlador.login);

  app
    .route("/usuario/logout")
    .post(
      [middlewaresAutenticacao.refresh, middlewaresAutenticacao.bearer],
      usuariosControlador.logout,
    );

  app
    .route("/usuario/verifica_email/:token")
    .get(
      middlewaresAutenticacao.verificacaoEmail,
      usuariosControlador.verificaEmail,
    );

  app
    .route("/usuario")
    .post(usuariosControlador.adiciona)
    .get(
      [middlewaresAutenticacao.bearer, middlewaresAutorizacao("user", "ler")],
      usuariosControlador.lista,
    );

  app
    .route("/usuario/:id")
    .delete(
      [
        middlewaresAutenticacao.bearer,
        middlewaresAutenticacao.local,
        middlewaresAutorizacao("user", "remover"),
      ],
      usuariosControlador.deleta,
    );
};
