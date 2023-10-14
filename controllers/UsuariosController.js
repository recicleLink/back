const UsuariosModel = require('../models/UsuariosModel');
const { validationResult } = require('express-validator');
const UsuarioTiposModel = require('../models/UsuarioTiposModel');

class UsuariosController {
  static async vefificaUsuarioTipoID(id) {
    try {
      const registro = await UsuarioTiposModel.findById(id);
      return registro ? true : false;
    } catch (err) {
      throw new Error(
        'Erro ao verificar a existência do ID do tipo de usuário'
      )
    }
  }

  static async getUsuarios(_, res) {
    try {
      const colunas = [
        '_id',
        'ust_id',
        'usu_nome',
        'usu_celular',
        'usu_email',
        'usu_senha',
        'usu_endereco'
      ];
      const registros = await UsuariosModel.find().select(colunas.join(' '));
      
      return res.status(200).json(registros);
    } catch (err) {
      return res.status(500).json({'erro': 'Erro desconhecido'});
    }
  }

  static async getUsuarioByID(req, res) {
    try {
      const { id } = req.params;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const colunas = [
        '_id',
        'ust_id',
        'usu_nome',
        'usu_celular',
        'usu_email',
        'usu_senha',
        'usu_endereco'
      ];
      const registro = await UsuariosModel
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

  static async getUsuarioByPhone(req, res) {
    try {
      const { celular } = req.params;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const colunas = [
        '_id',
        'ust_id',
        'usu_nome',
        'usu_celular',
        'usu_email',
        'usu_senha',
        'usu_endereco'
      ];
      const registro = await UsuariosModel
        .find({'usu_celular': celular})
        .select(colunas.join(' '));
      
      return res.status(200).json(registro[0] ? registro[0] : {});
    } catch (err) {
      if (err.name == 'Error') {
        return res.status(400).json({'erro': err.message});
      } else {
        return res.status(500).json({'erro': 'Erro desconhecido'});
      }
    }
  }

  static async addUsuario(req, res) {
    try {
      const {
        tipo_usuario_id,
        nome,
        celular,
        email,
        senha,
        endereco
      } = req.body;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const usuarioTipoExiste = await UsuariosController
        .vefificaUsuarioTipoID(tipo_usuario_id)
      if (!usuarioTipoExiste) {
        throw new Error('O campo do ID tipo de usuário está incorreto')
      }

      const registro = new UsuariosModel({
        ust_id: tipo_usuario_id,
        usu_nome: nome,
        usu_celular: celular,
        usu_email: email,
        usu_senha: senha,
        usu_endereco: endereco
      });
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

  static async updateUsuarios(req, res) {
    try {
      const { id } = req.params;
      const {
        tipo_usuario_id,
        nome,
        celular,
        email,
        senha,
        endereco
      } = req.body;

      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const usuarioTipoExiste = await UsuariosController
        .vefificaUsuarioTipoID(tipo_usuario_id)
      if (!usuarioTipoExiste) {
        throw new Error('O campo ID do tipo de usuário está incorreto')
      }

      const registro = await UsuariosModel.findByIdAndUpdate(
        {'_id': id},
        {$set: {
          ust_id: tipo_usuario_id,
          usu_nome: nome,
          usu_celular: celular,
          usu_email: email,
          usu_senha: senha,
          usu_endereco: endereco
        }}
      )

      if (registro == null) {
        throw new Error('O campo ID do usuário está incorreto');
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

  static async deleteUsuarios(req, res) {
    try {
      const { id } = req.params
      
      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(erro => {throw new Error(erro.msg)})
      };

      const registro = await UsuariosModel.findByIdAndDelete(id)

      if (registro == null) {
        throw new Error('O campo ID do usuário está incorreto');
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

module.exports = UsuariosController;