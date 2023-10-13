const UsuariosRoutes = require('./UsuariosRoutes');
const MateriaisRoutes = require('./MateriaisRoutes');
const UsuarioTiposRoutes = require('./UsuarioTiposRoutes');
const SolicitacaoSituacoesRoutes = require('./SolicitacaoSituacoesRoutes');

const routes = (app) => {
  app.use('/api/usuarios', UsuariosRoutes);
  app.use('/api/materiais', MateriaisRoutes);
  app.use('/api/usuarioTipos', UsuarioTiposRoutes);
  app.use('/api/solicitacaoSituacoes', SolicitacaoSituacoesRoutes);
};

module.exports = routes;