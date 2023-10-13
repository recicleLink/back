const UsuariosRoutes = require('./UsuariosRoutes');
const UsuarioTiposRoutes = require('./UsuarioTiposRoutes');

const routes = (app) => {
  app.use('/api/usuarioTipos', UsuarioTiposRoutes);
  app.use('/api/usuarios', UsuariosRoutes);
};

module.exports = routes;