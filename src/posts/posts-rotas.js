const postsControlador = require("./posts-controlador");
const { middlewaresAutenticacao } = require("../usuarios");
const middlewaresAutorizacao = require("../middlewares/autorizacao");
const tentarAutenticar = require("../middlewares/tentarAutenticar");
const tentarAutorizar = require("../middlewares/tentarAutorizar");

module.exports = (app) => {
  app
    .route("/post")
    .get(
      [tentarAutenticar, tentarAutorizar("post", "ler")],
      postsControlador.lista,
    )
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
        middlewaresAutenticacao.local,
        middlewaresAutorizacao("post", "remover"),
      ],
      postsControlador.remover,
    );
};
