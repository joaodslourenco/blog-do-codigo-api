const postsControlador = require("./posts-controlador");
const { middlewaresAutenticacao } = require("../usuarios");
const middlewaresAutorizacao = require("../middlewares/autorizacao");

module.exports = (app) => {
  app
    .route("/post")
    .get(middlewaresAutenticacao.bearer, postsControlador.lista)
    .post(
      [middlewaresAutenticacao.bearer, middlewaresAutorizacao("post", "criar")],
      postsControlador.adiciona,
    );

  app
    .route("/post/:id")
    .get(
      [middlewaresAutenticacao.bearer, middlewaresAutorizacao("post", "ler")],
      postsControlador.obterDetalhes,
    )
    .delete(
      [
        middlewaresAutenticacao.bearer,
        middlewaresAutorizacao("post", "remover"),
      ],
      postsControlador.remover,
    );
};
