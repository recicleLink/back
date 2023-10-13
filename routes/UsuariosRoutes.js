const { Router } = require('express');
const UsuariosController = require('../controllers/UsuariosController');
const { usersInsertSchema, usersSelectByIDSchema, usersSelectByPhoneSchema } = require('../middlewares/UsersValidation');

const UsuariosRoutes = Router();

UsuariosRoutes
  .get('/:id', usersSelectByIDSchema, UsuariosController.getUsuarioByID);
UsuariosRoutes.get('/', UsuariosController.getUsuarios);
UsuariosRoutes.get(
  '/celular/:celular',
  usersSelectByPhoneSchema,
  UsuariosController.getUsuarioByPhone
);
UsuariosRoutes.post('/', usersInsertSchema, UsuariosController.addUsuario);
UsuariosRoutes.put(
  '/:id',
  usersInsertSchema,
  usersSelectByIDSchema,
  UsuariosController.updateUsuarios
)
UsuariosRoutes
  .delete('/:id', usersSelectByIDSchema, UsuariosController.deleteUsuarios);

module.exports = UsuariosRoutes;