const { Schema, model } = require('mongoose');

const MateriaisSchema = new Schema({
  mat_nome: { type: String, max: 60, unique: true, require: true }
});

module.exports = model('tb_materiais', MateriaisSchema);