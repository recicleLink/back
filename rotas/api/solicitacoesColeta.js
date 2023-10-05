// Importa as bibliotecas necessárias
const express = require("express");
const router = express.Router();
const SolicitacaoColeta = require("../../modelos/SolicitacaoColeta");

// Rota POST para criar uma nova solicitação de coleta
router.post("/", async (req, res) => {
  console.log("Rota /solicitacoesColeta chamada");
  // Desestruturação para obter os dados do corpo da requisição
  const { usuario, endereco, descricao } = req.body;

  try {
    // Cria um novo objeto de solicitação de coleta
    const novaSolicitacao = new SolicitacaoColeta({
      usuario,
      endereco,
      descricao,
    });

    // Salva a solicitação de coleta no banco de dados
    const solicitacao = await novaSolicitacao.save();

    // Retorna a solicitação de coleta criada
    res.json(solicitacao);
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

router.get("/", async (req, res) => {
  try {
    const solicitacoes = await SolicitacaoColeta.find();
    res.json(solicitacoes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

// Rota GET para buscar as solicitações de um usuário específico
router.get("/usuario/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const solicitacoes = await SolicitacaoColeta.find({ usuario: usuarioId });
    res.json(solicitacoes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

// Exporta o router para ser usado em outros arquivos
module.exports = router;
