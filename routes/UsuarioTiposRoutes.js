const { Router } = require('express');
const UsuarioTiposController = require('../controllers/UsuarioTiposController');
const { userTypesInsertSchema, userTypesSelectByIDSchema } = require('../middlewares/UserTypesValidation');

const UsuarioTiposRoutes = Router();

UsuarioTiposRoutes.get(
  '/:id',
  userTypesSelectByIDSchema,
  UsuarioTiposController.getUsuarioTipo
);
UsuarioTiposRoutes.get('/', UsuarioTiposController.getUsuarioTipos);
UsuarioTiposRoutes
  .post('/', userTypesInsertSchema, UsuarioTiposController.addUsuarioTipos);
UsuarioTiposRoutes.put(
  '/:id',
  userTypesInsertSchema,
  userTypesSelectByIDSchema,
  UsuarioTiposController.updateUsuarioTipo
);
UsuarioTiposRoutes.delete(
  '/:id',
  userTypesSelectByIDSchema,
  UsuarioTiposController.deleteUsuarioTipo
);

module.exports = UsuarioTiposRoutes;