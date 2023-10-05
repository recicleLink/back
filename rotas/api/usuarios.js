// Importa as bibliotecas necessárias
const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../../modelos/Usuario");

const router = express.Router();

// Rota GET para obter todos os usuários
router.get("/", async (req, res) => {
  try {
    // Busca todos os usuários no banco de dados
    const usuarios = await Usuario.find();
    // Retorna os usuários encontrados
    res.status(200).json(usuarios);
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    res.status(500).json({"error": 'Erro no servidor'});
  }
});

// Rota GET para obter usuários BY ID
router.get("/id", async (req, res) => {
  // Pega o query param 'id'
  const { id } = req.query;

  try {
    // Busca o usuário correspondente ao ID
    usuario = await Usuario.find({"_id": id})
    // Retorna os usuários encontrados
    res.status(200).json(usuario)
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    res.status(500).json({"error": 'Erro no servidor'});
  }
});

// Rota GET para obter os usuários BY tipo de usuário
router.get("/tipoUsuario", async (req, res) => {
  // Pega o query param 'tipoUsuario'
  const { tipoUsuario } = req.query;

  try {
    // Busca todos os usuários de um tipo específico
    usuarios = await Usuario.find({ tipoUsuario });
    // Retorna os usuários encontrados
    res.status(200).json(usuarios);
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    res.status(500).json({"error": 'Erro no servidor'});
  }
});

// Rota POST para registro de usuário
router.post("/", async (req, res) => {
  // Desestruturação para obter os dados do corpo da requisição
  const { nome, email, senha, endereco, tipoUsuario } = req.body;

  try {
    // Verifica se o e-mail já está em uso
    let usuario = await Usuario.findOne({ email });
    // Retorna um erro se o usuário já existir
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
    res.status(201).json();
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    res.status(500).json({"error": 'Erro no servidor'});
  }
});

// Exporta o router para ser usado em outros arquivos
module.exports = router;
