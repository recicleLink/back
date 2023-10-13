const { checkSchema } = require('express-validator');

const userTypesInsertSchema = checkSchema({
  'tipo': {
    notEmpty: { 
      errorMessage: 'O campo tipo_usuario_id não pode estar vazio'
    },
    isString: {
      errorMessage: 'O campo tipo_usuario_id deve ser do tipo string'
    },
    isLength: {
      options: { max: 60 },
      errorMessage: 'O campo tipo_usuario_id deve ter no máximo 60 caracteres.'
    }
  }
});

const userTypesSelectByIDSchema = checkSchema({
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

module.exports = {userTypesInsertSchema, userTypesSelectByIDSchema}