// Importa as bibliotecas necessárias
const express = require('express');
const conectarDB = require('./config/banco');

// Inicia o aplicativo Express
const app = express();

// Conecta ao banco de dados
conectarDB();

// Middleware para análise do corpo das requisições
app.use(express.json({ extended: false }));

// Define as rotas da API
app.use('/api/usuarios', require('./rotas/api/usuarios'));
app.use('/api/autenticacao', require('./rotas/api/autenticacao'));
app.use('/api/solicitacoesColeta', require('./rotas/api/solicitacoesColeta'));

// Define a porta do servidor e inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
