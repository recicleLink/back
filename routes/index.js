const UsuariosRoutes = require('./UsuariosRoutes');
const UsuarioTiposRoutes = require('./UsuarioTiposRoutes');
const MateriaisRoutes = require('./MateriaisRoutes')

const routes = (app) => {
  app.use('/api/usuarios', UsuariosRoutes);
  app.use('/api/materiais', MateriaisRoutes);
  app.use('/api/usuarioTipos', UsuarioTiposRoutes);
};

module.exports = routes;