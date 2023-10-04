```markdown
# RecycleLink Backend

RecycleLink é uma plataforma destinada a conectar moradores, cooperativas de reciclagem e coletores,
facilitando o processo de coleta seletiva e reciclagem na região de Embu-Guaçu, São Paulo.
Este repositório contém o código backend do projeto.

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB

## 🚀 Instalação e Execução

1. **Clonar o repositório**:
```bash
git clone https://github.com/FellGMS/RecycleLink.git
```

2. **Navegar até o diretório**:
```bash
cd RecycleLink
```

3. **Instalar as dependências**:
```bash
npm install
```

4. **Configurar o banco de dados**:
   - Crie uma conta e um banco de dados no MongoDB Atlas.
   - Substitua as credenciais no arquivo `config/banco.js`.

5. **Iniciar o servidor**:
```bash
npm start
```

## 📋 Endpoints

- **Usuários**:
  - `POST /api/usuarios/cadastro`: Cadastrar um novo usuário.
  - `POST /api/usuarios/login`: Autenticar um usuário.
  - `GET /api/usuarios/perfil`: Obter o perfil do usuário autenticado.

- **Solicitações de Coleta**:
  - `POST /api/solicitacoesColeta/nova`: Criar uma nova solicitação de coleta.
  - `GET /api/solicitacoesColeta`: Listar todas as solicitações de coleta.
  
## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuição

Para contribuir com o projeto, crie um fork e submeta suas alterações através de um Pull Request.

## 📬 Contato

- Github: [https://github.com/FellGMS/RecycleLink](https://github.com/FellGMS/RecycleLink)
```

Este README resume o processo de instalação e execução do backend do projeto RecycleLink,
além de listar as tecnologias utilizadas, os principais endpoints e outras informações relevantes
para os avaliadores e outros desenvolvedores.
