const nodemailer = require("nodemailer");

const configuracaoEmailTeste = (contaTeste) => ({
  host: "smtp.ethereal.email",
  auth: contaTeste,
});

const configuracaoEmailProducao = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USUARIO,
    pass: process.env.EMAIL_SENHA,
  },
  secure: true,
};

async function criaConfiguracaoEmail() {
  if (process.env.NODE_ENV === "production") {
    return configuracaoEmailProducao;
  } else {
    const contaTeste = await nodemailer.createTestAccount();
    return configuracaoEmailTeste(contaTeste);
  }
}

class Email {
  async enviaEmail() {
    const configuracaoEmail = await criaConfiguracaoEmail();
    const transportador = nodemailer.createTransport(configuracaoEmail);

    const info = await transportador.sendMail(this);

    if (process.env.NODE_ENV !== "production") {
      console.log("url:" + nodemailer.getTestMessageUrl(info));
    }
  }
}

class EmailVerificacao extends Email {
  constructor(usuario, endereco) {
    super();
    this.from = '"Blog Código" <no-reply@blogcodigo.com.br>';
    this.to = usuario.email;
    this.subject = "Verificação de e-mail";
    this.text = `Olá! Clique no link para verificar seu e-mail e ter acesso completo às funcionalidades: ${endereco}`;
    this.html = `<h1>Olá!</h1> <p>Clique no link para verificar seu e-mail e ter acesso completo às funcionalidades:</p> <a href="${endereco}">${endereco}</a>`;
  }
}

module.exports = { EmailVerificacao };
