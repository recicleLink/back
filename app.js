// Importa as bibliotecas necessárias
const cors = require("cors");
const express = require("express");
const conectarDB = require("./config/banco");
const swagger = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json")

// Inicia o aplicativo Express
const app = express();

// Conecta ao banco de dados
conectarDB();

// Habilita o CORS para todas as rotas  <-- Adicione o CORS aqui
app.use(cors());

// Middleware para análise do corpo das requisições
app.use(express.json({ extended: false }));

// Configura a documentação da API Swagger para ser acessada em '/api/docs'.
app.use('/api/docs', swagger.serve, swagger.setup(swaggerDoc));

// Define as rotas da API
app.use("/api/usuarios", require("./rotas/api/usuarios"));
app.use("/api/solicitacoesColeta", require("./rotas/api/solicitacoesColeta"));

// Define a porta do servidor e inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
