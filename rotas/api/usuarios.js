// Importa as bibliotecas necessárias
const express = require("express");
const router = express.Router();
const Usuario = require("../../modelos/Usuario");

// Rota GET para obter todos os usuários
router.get("/", async (req, res) => {
  try {
    // Busca todos os usuários no banco de dados
    const usuarios = await Usuario.find();
    // Retorna os usuários encontrados
    res.json(usuarios);
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

// Rota GET para obter todos os usuários ou apenas um tipo específico
router.get("/", async (req, res) => {
  const { tipoUsuario } = req.query; // Pega o query param 'tipoUsuario'

  try {
    let usuarios;

    if (tipoUsuario) {
      // Busca todos os usuários de um tipo específico
      usuarios = await Usuario.find({ tipoUsuario });
    } else {
      // Busca todos os usuários
      usuarios = await Usuario.find();
    }

    // Retorna os usuários encontrados
    res.json(usuarios);
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

// Exporta o router para ser usado em outros arquivos
module.exports = router;
