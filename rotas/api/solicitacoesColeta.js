// Importa as bibliotecas necessárias
const express = require("express");
const Usuario = require("../../modelos/Usuario");
const SolicitacaoColeta = require("../../modelos/SolicitacaoColeta");

// Criação do objeto roteador do Express
const router = express.Router();

// Rota GET para obter todas as solicitações
router.get("/", async (req, res) => {
  try {
    // Busca todos as solicitações do banco de dados
    const solicitacoes = await SolicitacaoColeta.find();
    // Retorna as solicitações encontradas
    res.status(200).json(solicitacoes);
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    res.status(500).json({"error": 'Erro no servidor'});
  }
});

// Rota GET para obter solicitação BY ID
router.get("/id", async (req, res) => {
  // Pega o query param 'id'
  const { id } = req.query;

  try {
    // Busca o usuário correspondente ao ID
    solicitacao = await SolicitacaoColeta.find({"_id": id})
    // Retorna os usuários encontrados
    return res.status(200).json(solicitacao)
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    return res.status(500).json({"error": 'Erro no servidor'});
  }
});

// Rota POST para criar uma nova solicitação de coleta
router.post("/", async (req, res) => {
  // Desestruturação para obter os dados do corpo da requisição
  const { idUsuario, endereco, descricao } = req.body;

  status_solicitacao = "andamento"

  try {
    // Cria um novo objeto de solicitação de coleta
    const novaSolicitacao = new SolicitacaoColeta({
      idUsuario,
      status_solicitacao,
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
router.get("/usuario", async (req, res) => {
  try {
    // Pega o id do usuáio
    const { idUsuario } = req.query;
    // Busca as solicitações desse usuário
    const solicitacoes = await SolicitacaoColeta.find({ idUsuario });
    // Retorna as solicitações desse usuário
    return res.status(200).json(solicitacoes);
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    return res.status(500).json({"error": 'Erro no servidor'});
  }
});

// Rota para atribuir uma solicitação a um coletador
router.post("/atribuir", async (req, res) => {
  // Pega o ID do coletor e o ID da solicitação
  const { idColetador, idSolicitacao } = req.body;

  try {
    // Atualizar o documento do coletador com a nova solicitação
    await Usuario.findByIdAndUpdate(
      idColetador,
      {$push: { solicitacoesAtribuidas: idSolicitacao }},
      { new: true }
    );

    // Retorna um status 200 e uma mensagem informando o sucesso
    return res
      .status(200)
      .json({"mensagem": "Solicitação atribuída com sucesso"});
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    return res.status(500).json({"error": 'Erro no servidor'});
  }
});

// Rota para finalizar uma solicitação
router.get("/finalizar", async (req, res) => {
  // Pega o ID da solicitação
  const { idSolicitacao } = req.query

  try {
    // Atualiza o status da solicitação
    await SolicitacaoColeta.findByIdAndUpdate(
      idSolicitacao,
      {$set: { status_solicitacao: "concluido" }},
      { new: true }
    )

    // Retorna um status 200 e uma mensagem informando o sucesso
    return res
      .status(200)
      .json({"mensagem": "Solicitação atribuída com sucesso"});
  } catch (err) {
    // Retorna uma resposta de erro caso algo dê errado
    console.error(err.message);
    return res.status(500).json({"error": 'Erro no servidor'});
  }
})

// Exporta o router para ser usado em outros arquivos
module.exports = router;
