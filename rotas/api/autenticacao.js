// Importa as bibliotecas necessárias
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../../modelos/Usuario");

// Rota POST para registro de usuário
router.post("/registro", async (req, res) => {
  console.log("Rota /registro chamada");
  console.log("Corpo da Requisição:", req.body);
  // Desestruturação para obter os dados do corpo da requisição
  const { nome, email, senha, endereco, tipoUsuario } = req.body;

  try {
    // Verifica se o e-mail já está em uso
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ erros: [{ msg: "Usuário já existe" }] });
    }

    // Cria um novo objeto de usuário
    usuario = new Usuario({
      nome,
      email,
      senha,
      endereco,
      tipoUsuario,
    });

    // Criptografa a senha antes de salvar no banco de dados
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(senha, salt);

    // Salva o usuário no banco de dados
    await usuario.save();

    // Retorna uma resposta de sucesso
    res.status(201).json({ msg: "Usuário registrado com sucesso" });
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

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
