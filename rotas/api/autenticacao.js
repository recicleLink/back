// Importa as bibliotecas necessárias
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Usuario = require('../../modelos/Usuario');

// Rota POST para registro de usuário
router.post('/registro', async (req, res) => {
  // Desestruturação para obter os dados do corpo da requisição
  const { nome, email, senha, endereco, tipoUsuario } = req.body;

  try {
    // Verifica se o e-mail já está em uso
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ erros: [{ msg: 'Usuário já existe' }] });
    }

    // Cria um novo objeto de usuário
    usuario = new Usuario({
      nome,
      email,
      senha,
      endereco,
      tipoUsuario
    });

    // Criptografa a senha antes de salvar no banco de dados
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(senha, salt);

    // Salva o usuário no banco de dados
    await usuario.save();

    // Retorna uma resposta de sucesso
    res.json({ msg: 'Usuário registrado com sucesso' });
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Exporta o router para ser usado em outros arquivos
module.exports = router;
