const { validationResult } = require('express-validator');
const SolicitacaoSituacoesModel = require('../models/SolicitacaoSituacoesModel');

class SolicitacaoSituacoesController {
  static async getSolicitacaoSituacoes(_, res) {
    try {
      const colunas = ['_id', 'sos_nome'];
      const registros = await SolicitacaoSituacoesModel
        .find()
        .select(colunas.join(' '));

      return res.status(200).json(registros);
    } catch (err) {
      return res.status(500).json({'erro': 'Erro desconhecido'});
    }
  }

  static async getSolicitacaoSituacao(req, res) {
    try {
      const { id } = req.params;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const colunas = ['_id', 'sos_nome'];
      const registro = await SolicitacaoSituacoesModel
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

  static async addSolicitacaoSituacao(req, res) {
    try {
      const { nome } = req.body;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const registro = new SolicitacaoSituacoesModel({ sos_nome: nome });
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

  static async updateSolicitacaoSituacao(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const registro = await SolicitacaoSituacoesModel
        .findByIdAndUpdate(id, {$set: {sos_nome: nome}});

        if (registro == null) {
          throw new Error(
            'O campo ID da situação da solicitação está incorreto'
          );
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

  static async deleteSolicitacaoSituacao(req, res) {
    try {
      const { id } = req.params

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const registro = await SolicitacaoSituacoesModel.findByIdAndDelete(id)

      if (registro == null) {
        throw new Error(
          'O campo ID da situação da solicitação está incorreto'
        );
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

module.exports = SolicitacaoSituacoesController;