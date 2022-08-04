<h1 align="center">👨‍💻 Blog do Código API - Node + Express + SQLite</h1>

<p align="center">
API para gerenciamento de blog que utiliza validação de tokens e controle de acesso através de RBAC (Role Based Access Control).
</p>

# ⚙️ Funcionalidades

- Encriptação de senhas para armazenamento de usuários no banco de dados;
- Autenticação com a utilização de tokens JWT e proteção de rotas da aplicação;
- Utilização de access e refresh tokens para maior segurança, sendo armazenados os tokens inválidos através do Redis;
- Envio de e-mails ao criar usuários para verificação de e-mail utilizando um token.
- Cargos de administrador, editor e assinante, com diferentes níveis de permissão.


# 🛠️ Tecnologias utilizadas

As seguintes tecnologias foram utilizadas:

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [SQLite](https://www.sqlite.org/)
- [Redis](https://redis.io/)

# 🚀 Como executar o projeto
### Primeiro, clone o projeto:
```bash
$ git clone https://github.com/joaodslourenco/blog-do-codigo-api.git
```

### Entre na pasta do projeto e, na raiz, rode o comando:
```bash
yarn 
```
OU
```bash
npm install
```

### Crie um arquivo .env na raiz do projeto, definindo as seguintes variáveis:

```bash
NODE_ENV="development"
BASE_URL="localhost:3000"
CHAVE_JWT=(gere uma string aleatória e insira como valor da variável. Recomendo usar o módulo crypto do node, executando um console.log(crypto.randomBytes(256).toString('base64'))

```

#### OBS: caso você deseje fazer o envio de um email usando uma conta real, altere o valor da variável NODE_ENV para "production" e adicione as seguintes variáveis:

```bash
EMAIL_HOST=(endereço do seu provedor de email)
EMAIL_USUARIO=(seu email)
EMAIL_SENHA=(sua senha)
````

## Para rodar o projeto, basta executar os seguintes comandos

```bash
yarn start
```
OU
```bash
npm start
```


## Rotas da API

Para começar a utilizar a API, com o servidor sendo executado, utilize o Postman ou Insomnia para fazer requisições às rotas, conforme exposto na tabela abaixo:

### Usuários
| Função | Tipo de requisição | Campos necessários (body) | Rota | Access Token |
|--------|--------------------|---------------------------|------|--------------|
| Consultar usuários | GET | N/A | "/usuario" | Possível consultar informações mais completas quando utilizar token |
| Cadastrar novo usuário | POST | {<br>"nome": "abc", <br> "email": "abc", <br> "senha": "abc", <br> "cargo": "admin/editor/assinante" <br>} | "/usuario" | N/A |
| Deletar pessoa | DELETE | N/A  | "/usuario/:id" | Necessário |
| Realizar login | POST | {<br>"email": "abc", <br>"senha": "123" <br>} | "/usuario/login" | Necessário |
| Realizar logout | POST | {<br>"refreshToken": "abc123" <br>} | "/usuario/logout" | Necessário |
| Atualizar token | POST | {<br>"refreshToken": "abc123" <br>} | "/usuario/atualiza_token | N/A |
| Verificar e-mail | GET | N/A | "/usuario/verifica_email/:token"| N/A |
| Receber token via e-mail para recuperação de senha | POST | {<br>"email": "abc" <br>} | "/usuario/esqueci-minha-senha" | N/A |
| Trocar senha | POST | {<br>"token": "abc123", <br> "senha": "abc123" <br>} | "/usuario/trocar-senha" | Necessário, no corpo da requisição.


### Posts
| Função | Tipo de requisição | Campos necessários (body) | Rota | Access Token |
|--------|--------------------|:-------------------------:|------|--------------|
| Consultar posts | GET | N/A | "/post" | Possível consultar informações mais completas quando utilizar token |
| Cadastrar novo post | POST | {<br>"titulo": "abc", <br> "conteudo": "abc" <br>} | "/post" | Necessário token de usuário com permissão (admin ou editor) |
| Consultar post específico| GET | N/A | "/post/:id" | Possível consultar informações mais completas quando utilizar token |
| Deletar post | DELETE | N/A | "/post/:id" | Necessário token de usuário com permissão (admin ou editor) |
