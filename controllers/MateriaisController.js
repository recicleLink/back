const { validationResult } = require('express-validator');
const MateriaisModel = require('../models/MateriaisModel');

class MateriaisController {
  static async getMateriais(_, res) {
    try {
      const colunas = ['_id', 'mat_nome'];
      const registros = await MateriaisModel
        .find()
        .select(colunas.join(' '));

      return res.status(200).json(registros);
    } catch (err) {
      return res.status(500).json({'erro': 'Erro desconhecido'});
    }
  }

  static async getMaterial(req, res) {
    try {
      const { id } = req.params;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const colunas = ['_id', 'mat_nome'];
      const registro = await MateriaisModel
        .findById(id)
        .select(colunas.join(' '));

      return res.status(200).json(registro ? registro : {});
    } catch (err) {
      if (err.name == 'Error') {
        return res.status(400).json({'erro': err.message});
      } else {
        return res.status(500).json({'erro': 'Erro desconhecido'});
      }
    }
  }

  static async addMaterial(req, res) {
    try {
      const { nome } = req.body;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const registro = new MateriaisModel({ mat_nome: nome });
      await registro.save();

      return res.status(201).json();
    } catch (err) {
      if (err.name == 'MongoServerError' && err.code == 11000) {
        return res.status(400).json({'erro': 'O registro já existe'});
      } else if (err.name == 'Error') {
        return res.status(400).json({'erro': err.message});
      } else {
        return res.status(500).json({'erro': 'Erro desconhecido'});
      }
    }
  }

  static async updateMaterial(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const registro = await MateriaisModel
        .findByIdAndUpdate(id, {$set: {mat_nome: nome}});

        if (registro == null) {
          throw new Error('O campo ID do material está incorreto');
        }

      return res.status(204).json();
    } catch (err) {
      if (err.name == 'MongoServerError' && err.code == 11000) {
        return res.status(400).json({'erro': 'O registro já existe'});
      } else if (err.name == 'Error') {
        return res.status(400).json({'erro': err.message});
      } else {
        return res.status(500).json({'erro': 'Erro desconhecido'});
      }
    }
  }

  static async deleteMaterial(req, res) {
    try {
      const { id } = req.params

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const registro = await MateriaisModel.findByIdAndDelete(id)

      if (registro == null) {
        throw new Error('O campo ID do material está incorreto');
      }

      return res.status(204).json();
    } catch (err) {
      if (err.name == 'Error') {
        return res.status(400).json({'erro': err.message});
      } else {
        return res.status(500).json({'erro': 'Erro desconhecido'});
      }
    }
  }
}

module.exports = MateriaisController