# RecycleLink Backend

RecycleLink é uma plataforma que facilita a coleta seletiva de resíduos, conectando moradores, cooperativas de reciclagem e catadores. Este repositório contém o código do backend do projeto, desenvolvido em Node.js e MongoDB.

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)

## 📂 Estrutura do Projeto

```plaintext
/backend
  /config
    - banco.js
  /modelos
    - Usuario.js
    - SolicitacaoColeta.js
  /rotas
    /api
      - autenticacao.js
      - usuarios.js
      - solicitacoesColeta.js
  - app.js
  - .env
```

## 🚀 Iniciando o Projeto

1. Clone o repositório no GitHub
2. Abra o projeto no seu editor de código favorito
3. Instale as dependências com o comando:
```bash
npm install
```
4. Execute o servidor com o comando:
```bash
npm start
```

## 📝 Endpoints

- Autenticação
  - `POST /api/autenticacao/registro`: Registra um novo usuário
  - `POST /api/autenticacao/login`: Autentica um usuário existente

- Usuários
  - `GET /api/usuarios`: Retorna todos os usuários
  - `GET /api/usuarios/:id`: Retorna um usuário específico
  - `PUT /api/usuarios/:id`: Atualiza um usuário específico
  - `DELETE /api/usuarios/:id`: Exclui um usuário específico

- Solicitações de Coleta
  - `GET /api/solicitacoesColeta`: Retorna todas as solicitações de coleta
  - `GET /api/solicitacoesColeta/:id`: Retorna uma solicitação de coleta específica
  - `POST /api/solicitacoesColeta`: Cria uma nova solicitação de coleta
  - `PUT /api/solicitacoesColeta/:id`: Atualiza uma solicitação de coleta específica
  - `DELETE /api/solicitacoesColeta/:id`: Exclui uma solicitação de coleta específica

## 📌 Informações Adicionais

O projeto RecycleLink é uma iniciativa para facilitar e incentivar a coleta seletiva e a reciclagem na comunidade. Esta versão do backend é um MVP (Produto Mínimo Viável) para demonstrar a funcionalidade básica da plataforma. Futuras atualizações irão expandir as funcionalidades e melhorar a experiência do usuário.

Para mais informações sobre o desenvolvimento e a estrutura do backend, consulte a documentação detalhada fornecida junto com o projeto.
