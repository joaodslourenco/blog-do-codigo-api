const nodemailer = require("nodemailer");

class Email {
  async enviaEmail() {
    const contaTeste = await nodemailer.createTestAccount();
    const transportador = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      auth: contaTeste,
    });

    const info = await transportador.sendMail(this);

    console.log("url:" + nodemailer.getTestMessageUrl(info));
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
