const UsuarioTiposRoutes = require('./UsuarioTiposRoutes');

const routes = (app) => {
  app.use('/api/usuarioTipos', UsuarioTiposRoutes);
};

module.exports = routes;