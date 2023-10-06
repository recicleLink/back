// Importa a biblioteca mongoose
const mongoose = require('mongoose');

// Define o esquema do modelo de solicitação de coleta
const SolicitacaoColetaSchema = new mongoose.Schema({
  idUsuario: { type: String, required: true },
  endereco: { type: String, required: true },
  descricao: { type: String, required: true },
  data: { type: Date, default: Date.now }
});

// Exporta o modelo de solicitação de coleta para ser usado em outros arquivos
module.exports = SolicitacaoColeta = mongoose.model('solicitacaocoletas', SolicitacaoColetaSchema);
