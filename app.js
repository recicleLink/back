const cors = require("cors");
const express = require("express");
const routes = require('./routes/index');
const conectarDB = require("./config/banco");
const swaggerDoc = require("./swagger.json");
const swagger = require("swagger-ui-express");

require("dotenv").config();

const app = express();
const porta = process.env.PORT

app.use(cors());
app.use(express.json({ extended: false }));

conectarDB();

app.use('/api/docs', swagger.serve, swagger.setup(swaggerDoc));

routes(app);

app.listen(porta, () => console.log(`Servidor iniciado na porta ${porta}`));
