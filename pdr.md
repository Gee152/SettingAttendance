# Product Requirements Document (PDR) / Project Documentation

## 1. Visão Geral do Projeto
Este projeto é uma API backend desenvolvida em **Node.js** com **TypeScript**, utilizando o framework **Express**. A arquitetura do projeto aparenta seguir princípios de *Clean Architecture* e *Domain-Driven Design (DDD)*, dividida em camadas lógicas:
- **Delivery**: Contém controladores, roteadores de Express e tratamento de respostas HTTP.
- **Domain**: Contém regras de negócios (Use Cases), repositórios (interfaces/implementações para dados) e validadores.
- **Infra**: Infraestrutura do projeto (ex: inicialização, dependências externas).

### Tecnologias Principais
- **Node.js & TypeScript**
- **Express** (Roteamento e Servidor Web)
- **TypeORM** (ORM para banco de dados)
- **PostgreSQL** (SGBD Relacional)
- **JWT (JSON Web Token)** (Autenticação)
- **Bcrypt** (Criptografia de senhas)

---

## 2. Endpoints da API

A API responde na porta `3333` e todos os endpoints estão configurados na raiz `/` (sem prefixo base). Todos os endpoints atuais utilizam o método **POST**.

### 👤 Usuários (User)
Gerenciamento de usuários e autenticação.
- `POST /register`: Criação/registro de um novo usuário.
- `POST /login`: Autenticação do usuário (retorna JWT).
- `POST /updateUser`: Atualização dos dados do usuário.
- `POST /deleteUser`: Exclusão de um usuário.
- `POST /checkEmailExists`: Verifica se um e-mail já está cadastrado no sistema.
- *`POST /startSessionUserWhatsApp`: Inicia sessão do WhatsApp (Sendo removido por descontinuação do Venom Bot).*

### 🎯 Campanhas (Campaign)
Gerenciamento de campanhas.
- `POST /createCampaign`: Criação de uma campanha.
- `POST /getCampaign`: Consulta de uma campanha.
- `POST /updateCampaign`: Atualização dos dados da campanha.
- `POST /deleteCampaign`: Exclusão de uma campanha.

### 📱 Contatos (Contact)
Gerenciamento de contatos para as campanhas/mensagens.
- `POST /createContact`: Criação de um contato.
- `POST /getContact`: Consulta de um contato.
- `POST /updateContact`: Atualização de um contato.
- `POST /deleteContact`: Exclusão de um contato.

### 💬 Mensagens (Message)
Envio e rastreamento de mensagens.
- `POST /createMessage`: Criação de uma mensagem.
- `POST /getMessage`: Consulta de uma mensagem.
- `POST /updateMessage`: Atualização de uma mensagem.
- `POST /deleteMessage`: Exclusão de uma mensagem.

---

## 3. Segurança e Configurações
- **CORS**: Configurado para permitir acessos de `http://localhost:3000` (com credenciais ativadas).
- **Body Parser**: Limite de JSON configurado para `100mb`, permitindo payload grande (útil para envio de mídias ou extrações pesadas).
- **Banco de Dados**: Configurado via URI de conexão para PostgreSQL (variável de ambiente `DATABASE_APP_POSTGRESQL_URI`).
