const { checkSchema } = require('express-validator');

const solicitacaoSituacoesInsertSchema = checkSchema({
  'nome': {
    notEmpty: { 
      errorMessage: 'O campo nome não pode estar vazio'
    },
    isString: {
      errorMessage: 'O campo nome deve ser do tipo string'
    },
    isLength: {
      options: { max: 60 },
      errorMessage: 'O campo nome deve ter no máximo 60 caracteres.'
    }
  }
});

const solicitacaoSituacoesSelectByIDSchema = checkSchema({
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

module.exports = {
  solicitacaoSituacoesInsertSchema,
  solicitacaoSituacoesSelectByIDSchema
}