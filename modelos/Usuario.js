// Importa a biblioteca mongoose
const mongoose = require('mongoose');

// Define o esquema do modelo de usuário
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  endereco: { type: String, required: true },
  tipoUsuario: { type: String, enum: ['usuario', 'coletador', 'cooperativa'], required: true }
});

// Exporta o modelo de usuário para ser usado em outros arquivos
module.exports = Usuario = mongoose.model('usuario', UsuarioSchema);
