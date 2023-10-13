const { Schema, model } = require('mongoose');

const SolicitacaoSituacoesSchema = new Schema({
  sos_nome: { type: String, max: 60, unique: true, require: true }
});

module.exports = model('tb_solicitacao_situacoes', SolicitacaoSituacoesSchema);