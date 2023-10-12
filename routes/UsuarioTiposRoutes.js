const { Router } = require('express');
const UsuarioTiposController = require('../controllers/UsuarioTiposController');

const UsuarioTiposRoutes = Router();

UsuarioTiposRoutes.get('/:id', UsuarioTiposController.getUsuarioTipo);
UsuarioTiposRoutes.get('/', UsuarioTiposController.getUsuarioTipos);
UsuarioTiposRoutes.post('/', UsuarioTiposController.addUsuarioTipos);
UsuarioTiposRoutes.put('/:id', UsuarioTiposController.updateUsuarioTipo);
UsuarioTiposRoutes.delete('/:id', UsuarioTiposController.deleteUsuarioTipo);

module.exports = UsuarioTiposRoutes;