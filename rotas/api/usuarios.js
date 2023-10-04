// Importa as bibliotecas necessárias
const express = require('express');
const router = express.Router();
const Usuario = require('../../modelos/Usuario');

// Rota GET para obter todos os usuários
router.get('/', async (req, res) => {
  try {
    // Busca todos os usuários no banco de dados
    const usuarios = await Usuario.find();
    // Retorna os usuários encontrados
    res.json(usuarios);
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Exporta o router para ser usado em outros arquivos
module.exports = router;
