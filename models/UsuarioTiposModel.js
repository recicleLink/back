const { Schema, model } = require('mongoose');

const UsuarioTiposSchema = new Schema({
  ust_tipo: { type: String, max: 60, unique: true, require: true }
});

module.exports = model('tb_usuario_tipos', UsuarioTiposSchema);