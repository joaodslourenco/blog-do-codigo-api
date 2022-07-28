const postsControlador = require("./posts-controlador");
const { middlewaresAutenticacao } = require("../usuarios");
const middlewaresAutorizacao = require("../middlewares/autorizacao");

module.exports = (app) => {
  app
    .route("/post")
    .get(middlewaresAutenticacao.bearer, postsControlador.lista)
    .post(middlewaresAutenticacao.bearer, postsControlador.adiciona);

  app
    .route("/post/:id")
    .get(middlewaresAutenticacao.bearer, postsControlador.obterDetalhes)
    .delete(
      [
        middlewaresAutenticacao.bearer,
        middlewaresAutorizacao(["admin", "editor"]),
      ],
      postsControlador.remover,
    );
};
