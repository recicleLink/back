const ParamsError = require('../errors/ParamsError');
const UsuarioTiposModel = require('../models/UsuarioTiposModel');


class UsuarioTposController {
  static async getUsuarioTipos(_, res) {
    try {
      const registros = await UsuarioTiposModel.find().select('_id ust_tipo');
      return res.status(200).json(registros);
    } catch (err) {
      return res.status(500).json({'erro': 'Erro desconhecido'});
    }
  }

  static async getUsuarioTipo(req, res) {
    try {
      const { id } = req.params;

      const registro = await UsuarioTiposModel
        .find({'_id': id})
        .select('_id ust_tipo');

      return res.status(200).json(registro);
    } catch (err) {
      if (err.name == 'CastError') {
        return res.status(400).json({'erro': 'O ID informado está incorreto'});
      } else {
        return res.status(500).json({'erro': 'Erro desconhecido'});
      }
    }
  }

  static async addUsuarioTipos(req, res) {
    try {
      const { tipo } = req.body;

      if (tipo == undefined || tipo == '') {
        throw new ParamsError(['tipo']);
      }

      const registro = new UsuarioTiposModel({ ust_tipo: tipo });
      await registro.save();

      return res.status(201).json();
    } catch (err) {
      if (err.name == 'MongoServerError' && err.code == 11000) {
        return res.status(400).json({'erro': 'O registro já existe'});
      } else if (err.name == 'ParamsError') {
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

      if (tipo == undefined || tipo == '') {
        throw new ParamsError(['tipo']);
      }

      const registro = await UsuarioTiposModel.findByIdAndUpdate(
        {'_id': id},
        {$set: {ust_tipo: tipo}}
      );

      if (registro == null) {
        throw new ParamsError(['id']);
      }

      return res.status(204).json();
    } catch (err) {
      if (err.name == 'MongoServerError' && err.code == 11000) {
        return res.status(400).json({'erro': 'O registro já existe'});
      } else if (err.name == 'ParamsError') {
        return res.status(400).json({'erro': err.message});
      } else if (err.name == 'CastError') {
        return res.status(400).json({'erro': 'O ID informado está incorreto'});
      } else {
        return res.status(500).json({'erro': 'Erro desconhecido'});
      }
    }
  }

  static async deleteUsuarioTipo(req, res) {
    try {
      const { id } = req.params

      const registro = await UsuarioTiposModel.findByIdAndDelete({'_id': id})

      if (registro == null) {
        throw new ParamsError(['id']);
      }

      return res.status(204).json();
    } catch (err) {
      if (err.name == 'ParamsError') {
        return res.status(400).json({'erro': err.message});
      } else if (err.name == 'CastError') {
        return res.status(400).json({'erro': 'O ID informado está incorreto'});
      } else {
        return res.status(500).json({'erro': 'Erro desconhecido'});
      }
    }
  }
};

module.exports = UsuarioTposController;