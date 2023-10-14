const { validationResult } = require('express-validator');
const UsuarioTiposModel = require('../models/UsuarioTiposModel');

class UsuarioTposController {
  static async getUsuarioTipos(_, res) {
    try {
      const colunas = ['_id', 'ust_tipo'];
      const registros = await UsuarioTiposModel
        .find()
        .select(colunas.join(' '));

      return res.status(200).json(registros);
    } catch (err) {
      return res.status(500).json({'erro': 'Erro desconhecido'});
    }
  }

  static async getUsuarioTipo(req, res) {
    try {
      const { id } = req.params;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const colunas = ['_id', 'ust_tipo'];
      const registro = await UsuarioTiposModel
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

  static async addUsuarioTipos(req, res) {
    try {
      const { tipo } = req.body;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const registro = new UsuarioTiposModel({ ust_tipo: tipo });
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

  static async updateUsuarioTipo(req, res) {
    try {
      const { id } = req.params;
      const { tipo } = req.body;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const registro = await UsuarioTiposModel
        .findByIdAndUpdate(id, {$set: {ust_tipo: tipo}});

        if (registro == null) {
          throw new Error('O campo ID do tipo de usuário está incorreto');
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

  static async deleteUsuarioTipo(req, res) {
    try {
      const { id } = req.params

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const registro = await UsuarioTiposModel.findByIdAndDelete(id)

      if (registro == null) {
        throw new Error('O campo ID do tipo de usuário está incorreto');
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
};

module.exports = UsuarioTposController;