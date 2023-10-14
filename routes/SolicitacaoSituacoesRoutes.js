const { Router } = require('express');
const SolicitacaoSituacoesController = require('../controllers/SolicitacaoSituacoesController');
const { solicitacaoSituacoesInsertSchema, solicitacaoSituacoesSelectByIDSchema } = require('../middlewares/SolicitacaoSituacoesValidation');

const SolicitacaoSituacoesRoutes = Router();

SolicitacaoSituacoesRoutes.get(
  '/:id',
  solicitacaoSituacoesSelectByIDSchema,
  SolicitacaoSituacoesController.getSolicitacaoSituacao
);
SolicitacaoSituacoesRoutes
  .get('/', SolicitacaoSituacoesController.getSolicitacaoSituacoes);
SolicitacaoSituacoesRoutes.post(
  '/',
  solicitacaoSituacoesInsertSchema,
  SolicitacaoSituacoesController.addSolicitacaoSituacao
);
SolicitacaoSituacoesRoutes.put(
  '/:id',
  solicitacaoSituacoesInsertSchema,
  solicitacaoSituacoesSelectByIDSchema,
  SolicitacaoSituacoesController.updateSolicitacaoSituacao
);
SolicitacaoSituacoesRoutes.delete(
  '/:id',
  solicitacaoSituacoesSelectByIDSchema,
  SolicitacaoSituacoesController.deleteSolicitacaoSituacao
);

module.exports = SolicitacaoSituacoesRoutes;