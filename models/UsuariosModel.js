const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
  ust_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tb_usuario_tipos',
    require: true
  },
  usu_nome: { type: String, max: 80, require: true },
  usu_celular: { type: String, max: 14, unique: true, require: true },
  usu_email: { type: String, max: 100, unique: true, require: true },
  usu_senha: { type: String, min: 8, require: true },
  usu_endereco: { type: String, require: true }
});

module.exports = mongoose.model('tb_usuarios', usuariosSchema);