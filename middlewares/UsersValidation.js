const { checkSchema } = require('express-validator');

const isCustomPhone = value => {
  const regex = /^\(\d{2}\)9\d{4}-\d{4}$/;
  return regex.test(value)
};

const usersInsertSchema = checkSchema({
  'tipo_usuario_id': {
    notEmpty: { 
      errorMessage: 'O campo tipo_usuario_id não pode estar vazio'
    },
    isString: {
      errorMessage: 'O campo tipo_usuario_id deve ser do tipo string'
    },
    isMongoId: {
      errorMessage: 'O campo tipo_usuario_id está incorreto. Deve ser um MongoID'
    }
  },
  'nome': {
    notEmpty: { 
      errorMessage: 'O campo nome não pode estar vazio'
    },
    isString: {
      errorMessage: 'O campo nome deve ser do tipo string'
    },
    isLength: {
      options: { max: 80 },
      errorMessage: 'O campo nome deve ter no máximo 80 caracteres.'
    }
  },
  'celular': {
    notEmpty: { 
      errorMessage: 'O campo celular não pode estar vazio'
    },
    isString: {
      errorMessage: 'O campo celular deve ser do tipo string'
    },
    isLength: {
      options: { max: 14 },
      errorMessage: 'O campo celular deve ter no máximo 14 caracteres.'
    },
    custom: {
      options: isCustomPhone,
      errorMessage: 'O campo celular está incorreto. Deve estar no formato (XX)9XXXX-XXXX.'
    }
  },
  'email': {
    notEmpty: { 
      errorMessage: 'O campo email não pode estar vazio'
    },
    isString: {
      errorMessage: 'O campo email deve ser do tipo string'
    },
    isLength: {
      options: { max: 100 },
      errorMessage: 'O campo email deve ter no máximo 80 caracteres.'
    },
    isEmail: {
      errorMessage: 'O campos email está incorreto. Deve estar no formato nome_usuario@dominio'
    }
  },
  'senha': {
    notEmpty: { 
      errorMessage: 'O campo senha não pode estar vazio'
    },
    isString: {
      errorMessage: 'O campo senha deve ser do tipo string'
    },
    isLength: {
      options: { min: 8 },
      errorMessage: 'O campo senha deve ter no mínimo 8 caracteres.'
    },
  },
  'endereco': {
    notEmpty: { 
      errorMessage: 'O campo endereco não pode estar vazio'
    },
    isString: {
      errorMessage: 'O campo endereco deve ser do tipo string'
    },
  }
});

const usersSelectByIDSchema = checkSchema({
  'id': {
    notEmpty: { 
      errorMessage: 'O campo id não pode estar vazio'
    },
    isString: {
      errorMessage: 'O campo id deve ser do tipo string'
    },
    isMongoId: {
      errorMessage: 'O campo id está incorreto. Deve ser um MongoID'
    }
  }
});

const usersSelectByPhoneSchema = checkSchema({
  'celular': {
    notEmpty: { 
      errorMessage: 'O campo celular não pode estar vazio'
    },
    isString: {
      errorMessage: 'O campo celular deve ser do tipo string'
    },
    isLength: {
      options: { max: 14 },
      errorMessage: 'O campo celular deve ter no máximo 14 caracteres.'
    },
    custom: {
      options: isCustomPhone,
      errorMessage: 'O campo celular está incorreto. Deve estar no formato (XX)9XXXX-XXXX.'
    }
  }
});

module.exports = {
  usersInsertSchema,
  usersSelectByIDSchema,
  usersSelectByPhoneSchema
};