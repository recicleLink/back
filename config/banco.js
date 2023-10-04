// Importa a biblioteca mongoose
const mongoose = require("mongoose");
require("dotenv").config();

// Função assíncrona para conectar ao banco de dados
const conectarDB = async () => {
  try {
    // Tenta conectar ao banco de dados com a URI do MongoDB no arquivo .env
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Exibe mensagem no console caso a conexão seja bem-sucedida
    console.log("Banco de dados conectado");
  } catch (err) {
    // Exibe mensagem de erro no console e encerra o processo caso a conexão falhe
    console.error(err.message);
    process.exit(1);
  }
};

// Exporta a função conectarDB para ser usada em outros arquivos
module.exports = conectarDB;
