// Importa as bibliotecas necessárias
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../../modelos/Usuario");

// rotas/api/autenticacao.js
router.post("/login", async (req, res) => {
  console.log("Rota /login chamada");
  const { email, senha } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res
        .status(400)
        .json({ erros: [{ msg: "Credenciais inválidas" }] });
    }

    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      return res
        .status(400)
        .json({ erros: [{ msg: "Credenciais inválidas" }] });
    }

    // Definindo o payload do token
    const payload = {
      user: {
        id: usuario.id,
        tipoUsuario: usuario.tipoUsuario,
        solicitacoesAtribuidas: usuario.solicitacoesAtribuidas,
      },
    };

    // Gerando o token
    jwt.sign(
      payload,
      "sua_chave_secreta", // troque pela sua chave secreta
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          msg: "Usuário autenticado com sucesso",
          token,
          tipoUsuario: usuario.tipoUsuario,
          solicitacoesAtribuidas: usuario.solicitacoesAtribuidas,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

// Exporta o router para ser usado em outros arquivos
module.exports = router;
