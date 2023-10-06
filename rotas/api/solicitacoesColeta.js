// Importa as bibliotecas necessárias
const express = require("express");
const SolicitacaoColeta = require("../../modelos/SolicitacaoColeta");

// Criação do objeto roteador do Express
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const solicitacoes = await SolicitacaoColeta.find();
    res.json(solicitacoes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

// Rota POST para criar uma nova solicitação de coleta
router.post("/", async (req, res) => {
  // Desestruturação para obter os dados do corpo da requisição
  const { idUsuario, endereco, descricao } = req.body;

  try {
    // Cria um novo objeto de solicitação de coleta
    const novaSolicitacao = new SolicitacaoColeta({
      idUsuario,
      endereco,
      descricao,
    });

    // Salva a solicitação de coleta no banco de dados
    const solicitacao = await novaSolicitacao.save();

    // Retorna a solicitação de coleta criada
    return res.status(201).json();
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    return res.status(500).json({"error": 'Erro no servidor'});
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

// Rota para atribuir uma solicitação a um coletador
router.post("/atribuir", async (req, res) => {
  const { coletadorId, solicitacaoId } = req.body;

  try {
    // Atualizar o documento do coletador com a nova solicitação
    await Usuario.findByIdAndUpdate(
      coletadorId,
      {
        $push: { solicitacoesAtribuidas: solicitacaoId },
      },
      { new: true }
    );

    res.status(200).json({ msg: "Solicitação atribuída com sucesso" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

// Exporta o router para ser usado em outros arquivos
module.exports = router;
