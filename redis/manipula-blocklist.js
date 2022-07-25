const blocklist = require("./blocklist");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { createHash } = require("crypto");
const existsAsync = promisify(blocklist.exists).bind(blocklist);
const setAsync = promisify(blocklist.set).bind(blocklist);

function geraTokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}

module.exports = {
  adiciona: async (token) => {
    const dataExpiracao = jwt.decode(token).exp;
    const tokenHash = geraTokenHash(token);
    await setAsync(tokenHash, "");
    blocklist.expireAt(token, dataExpiracao);
  },
  contemToken: async (token) => {
    const tokenHash = geraTokenHash(token);
    const resultado = await existsAsync(tokenHash);
    return resultado === 1;
  },
};
