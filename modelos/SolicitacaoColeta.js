// Importa a biblioteca mongoose
const mongoose = require('mongoose');

// Define o esquema do modelo de solicitação de coleta
const SolicitacaoColetaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' },
  endereco: { type: String, required: true },
  descricao: { type: String, required: true },
  data: { type: Date, default: Date.now }
});

// Exporta o modelo de solicitação de coleta para ser usado em outros arquivos
module.exports = SolicitacaoColeta = mongoose.model('solicitacaoColeta', SolicitacaoColetaSchema);
