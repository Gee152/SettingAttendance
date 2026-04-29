# PDR — SettingAttendance Backend
> **Product Development Requirements**  
> Versão: 2.0 | Atualizado em: 2026-04-04  
> Orquestrado por: `@orchestrator` + `@backend-specialist` + `@database-architect` + `@security-auditor`

---

## 1. Visão Geral do Projeto

**SettingAttendance** é uma API backend desenvolvida em **Node.js + TypeScript**, usando **Express** como camada HTTP, **TypeORM** como ORM e **PostgreSQL** como banco de dados relacional.

A arquitetura segue princípios de **Clean Architecture** com influência de **DDD (Domain-Driven Design)**, dividida em camadas bem definidas:

| Camada | Responsabilidade |
|--------|-----------------|
| `delivery/` | Controladores, routers HTTP, formatação de resposta |
| `domain/` | Regras de negócio (UseCases), interfaces de repositório, validações, UCIOs |
| `infra/` | Implementações concretas de banco (TypeORM), entidades, transformers |

---

## 2. Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Node.js | 22.x | Runtime |
| TypeScript | 5.8.x | Tipagem estática |
| Express | 5.1.x | Framework HTTP |
| TypeORM | 0.3.22 | ORM |
| PostgreSQL | 16.x | Banco relacional |
| JWT (jsonwebtoken) | 9.x | Autenticação |
| Bcrypt | 5.x | Hash de senhas |
| UUID (v4) | built-in | Geração de IDs |
| dotenv | 16.x | Variáveis de ambiente |
| Docker Compose | — | Infraestrutura local |

---

## 3. Arquitetura de Camadas

```
src/
├── index.ts                        # Entry point — inicializa CMD e env
├── data-source.ts                  # TypeORM DataSource — conexão DB
│
├── delivery/
│   ├── cmd/cmd.ts                  # Inicializa Express e DB
│   ├── controller/
│   │   ├── user.ts                 # Controllers de User
│   │   └── proposal.ts             # Controllers de Proposal
│   ├── router/
│   │   ├── index.ts                # Agregador de routers
│   │   ├── user.ts                 # Rotas de User
│   │   └── proposal.ts             # Rotas de Proposal
│   └── response/response.ts        # SuccessResponse | InternalServerErrorResponse
│
├── domain/
│   ├── association/
│   │   ├── association.ts          # UserAssociation, CampaignAssociation, etc.
│   │   ├── proposal.ts             # ProposalAssociation
│   │   ├── error.ts                # PreconditionError, InternalServerError
│   │   └── UserTokenPayload.ts     # Payload do JWT
│   ├── ucio/
│   │   ├── user.ts                 # Request/Response DTOs de User
│   │   └── proposal.ts             # Request/Response DTOs de Proposal
│   ├── usecase/
│   │   ├── UserUseCase.ts          # Lógica de negócio de User
│   │   └── ProposalUseCase.ts      # Lógica de negócio de Proposal
│   ├── repository/
│   │   ├── user.ts                 # Repository adapter de User
│   │   └── proposal.ts             # Repository adapter de Proposal
│   └── validate/
│       ├── user.ts                 # Validações de User
│       ├── proposal.ts             # Validações de Proposal
│       └── common.ts               # checkEmpty e helpers
│
└── infra/
    └── database/
        ├── entity/
        │   ├── user.entity.ts      # Entidade TypeORM de User
        │   └── proposal.entity.ts  # Entidade TypeORM de Proposal
        ├── transforme/             # Mappers Association ↔ Entity
        ├── user.ts                 # Funções DB de User
        └── proposal.ts             # Funções DB de Proposal
```

---

## 4. Camada: USER — CRUD Completo

### 4.1 Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `POST` | `/register` | Cria novo usuário | Público |
| `POST` | `/login` | Autentica e retorna JWT | Público |
| `POST` | `/updateUser` | Atualiza dados do usuário | ⚠️ Falta middleware JWT |
| `POST` | `/deleteUser` | Remove usuário | ⚠️ Falta middleware JWT |
| `POST` | `/checkEmailExists` | Verifica se email está cadastrado | Público |

### 4.2 Fluxo de Dados — Cadastro

```
POST /register
  → CreateUserRegisterController.createUser(req, res)
    → CreateUserUseCaseRequest(name, email, password)
      → CreateUserUseCase.execute(req)
        → CreateUserValidate.createUserValidate(req)         ← Valida campos obrigatórios
        → bcrypt.hash(password, 10)                         ← Hash da senha
        → CreateUserRepository.createUser(UserAssociation)  ← Persiste no DB
          → createUser(user) [infra]
            → toUserModel(user)                             ← Mapeia para UserEntity
            → repository.save(entity)                      ← TypeORM save
            → toUserEntity(result)                         ← Retorna UserAssociation
        ← CreateUserUseCaseResponse(user | null, error | null)
  ← SuccessResponse.success(res, ucRes)  → HTTP 200 | 400
```

### 4.3 Schema da Entidade `users`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `user_id` | UUID | PK, auto-gerado |
| `name` | VARCHAR | NOT NULL |
| `email` | VARCHAR | NOT NULL |
| `passwordHash` | VARCHAR | NOT NULL |
| `role` | VARCHAR | DEFAULT `'User'` |
| `isActive` | BOOLEAN | DEFAULT `false` |
| `createdAt` | TIMESTAMP | Auto |
| `updatedAt` | TIMESTAMP | Auto |

### 4.4 Use Cases de User

| Use Case | Classe | Função |
|----------|--------|--------|
| Criar | `CreateUserUseCase` | Cria usuário com UUID + hash bcrypt |
| Login | `LoginUserUseCase` | Valida senha + emite JWT (7d) |
| Atualizar | `UpdateUserUseCase` | Busca por ID e atualiza campos |
| Deletar | `DeleteUserUseCase` | Remove usuário por ID |
| Verificar Email | `CheckEmailExistsUserUseCase` | Checa se email já existe no DB |

### 4.5 Payloads

**POST /register**
```json
{
  "name": "Gabriel Lima",
  "email": "gabriel@email.com",
  "password": "Senha@123"
}
```

**POST /login**
```json
{ "email": "gabriel@email.com", "passwordHash": "Senha@123" }
```
Resposta: `{ token: "eyJ...", user: { userID, name, email, role } }`

**POST /updateUser**
```json
{ "userID": "uuid", "name": "Novo Nome", "email": "novo@email.com", "password": "Nova@123" }
```

**POST /deleteUser**
```json
{ "userID": "uuid" }
```

---

## 5. Camada: PROPOSAL — CRUD Completo

### 5.1 Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `POST` | `/createProposal` | Cria nova proposta | ✅ Público |
| `POST` | `/getProposal` | Busca proposta por ID | ✅ Público |
| `POST` | `/listProposal` | Lista todas as propostas ativas | ✅ Público |
| `POST` | `/updatedProposal` | Atualiza proposta existente | ✅ Público |
| `POST` | `/deleteProposal` | Soft delete (isActive = false) | ✅ Público |

### 5.2 Fluxo de Dados — Criação

```
POST /createProposal
  → CreateProposalController.createProposal(req, res)
    → CreateProposalUseCaseRequest(...campos)
      → CreateProposalUseCase.execute(req)
        → CreateProposalValidate.createProposalValidate(req)   ← Valida campos obrigatórios
        → CreateProposalRepository.createProposal(proposal)   ← Persiste
          → createProposal(proposal) [infra]
            → toProposalModel(proposal)                       ← Mapeia para ProposalModel
            → repository.save(entity)                        ← TypeORM save
            → toProposalAssociation(result)                  ← Retorna ProposalAssociation
        ← CreateProposalUseCaseResponse(proposal | null, error | null)
  ← SuccessResponse.success(res, ucRes)
```

### 5.3 Soft Delete

A proposta **nunca é deletada fisicamente**. O campo `is_active` é definido como `false` e todas as queries de leitura filtram por `{ isActive: true }`.

### 5.4 Schema da Entidade `proposal`

| Coluna | Tipo | Constraints |
|--------|------|-------------|
| `proposal_id` | UUID | PK |
| `address` | VARCHAR(255) | NOT NULL |
| `cod_operator` | VARCHAR(100) | NOT NULL |
| `holder` | VARCHAR(255) | NOT NULL |
| `dependents` | VARCHAR(255) | nullable |
| `date_of_birth` | DATE | NOT NULL |
| `cpf` | VARCHAR(15) | NOT NULL |
| `identity` | VARCHAR(20) | nullable |
| `proposal_number` | VARCHAR(100) | NOT NULL |
| `whatsapp` | VARCHAR(15) | NOT NULL |
| `zip_code` | VARCHAR(15) | NOT NULL |
| `number_resident` | VARCHAR(1000) | NOT NULL |
| `uf` | VARCHAR(2) | NOT NULL |
| `contact` | VARCHAR(255) | NOT NULL |
| `email` | VARCHAR(255) | NOT NULL |
| `contract_readjustment` | DATE | NOT NULL |
| `contract_implementation` | DATE | NOT NULL |
| `bill_expiration` | DATE | NOT NULL |
| `contract_price` | DECIMAL(10,2) | NOT NULL |
| `lead` | VARCHAR(255) | NOT NULL |
| `plan` | VARCHAR(255) | NOT NULL |
| `type_of_contract` | VARCHAR(100) | NOT NULL |
| `office` | VARCHAR(255) | NOT NULL |
| `broker` | VARCHAR(255) | NOT NULL |
| `adm_fee` | DECIMAL(10,2) | NOT NULL |
| `supervisor` | VARCHAR(255) | NOT NULL |
| `is_active` | BOOLEAN | DEFAULT `true` |
| `created_at` | TIMESTAMP | Auto |
| `updated_at` | TIMESTAMP | Auto |

### 5.5 Payload de Criação

```json
{
  "address": "Rua das Flores, 123",
  "codOperator": "OP-001",
  "holder": "João da Silva",
  "dependents": null,
  "dateOfBirth": "1990-01-15",
  "cpf": "123.456.789-00",
  "identity": "RG-123456",
  "proposalNumber": "PROP-2024-001",
  "whatsapp": "11999999999",
  "zipCode": "01310-100",
  "numberResident": "Apto 42",
  "UF": "SP",
  "contact": "João",
  "email": "joao@email.com",
  "contractReadjustment": "2025-01-01",
  "contractImplementation": "2025-01-15",
  "billExpiration": "2025-02-01",
  "contractPrice": 299.90,
  "lead": "Indicação",
  "plan": "Plano Premium",
  "typeOfContract": "PF",
  "office": "Unidade SP",
  "broker": "Corretor XYZ",
  "admFee": 15.00,
  "supervisor": "Supervisor A"
}
```

---

## 6. Padrão de Resposta da API

```typescript
// HTTP 200 — Sucesso
{ "user": { ... } }       // ou "proposal", "token", etc.

// HTTP 400 — Erro de negócio
{ "error": { "code": 412, "message": "O campo cpf é obrigatório" } }

// HTTP 500 — Erro interno
{ "error": { "code": 500, "message": "..." } }
```

---

## 7. Segurança e Configurações

| Configuração | Status | Detalhe |
|-------------|--------|---------|
| CORS | ✅ | Permite `http://localhost:3000` com credenciais |
| Body Parser | ✅ | JSON limitado a `100mb` |
| Bcrypt (hash de senha) | ✅ | 10 salt rounds |
| JWT | ✅ | Expira em 7 dias |
| Variáveis de ambiente | ✅ | `.env` com `DB_*` e `JWT_SECRET` |
| Middleware JWT nas rotas User (update/delete) | ❌ | **Não implementado — GAP CRÍTICO** |
| Rotas de Proposal | ✅ | Públicas por decisão de design |
| Rate Limiting | ❌ | Não implementado |
| Autorização por Role | ❌ | `role` existe na entidade mas não é verificado |
| Input sanitization | ⚠️ | Apenas `checkEmpty()` — sem sanitização avançada |

---

## 8. Infraestrutura

**Variáveis de Ambiente (`.env`)**

```env
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=messaging_app
JWT_SECRET=seu_secret_aqui
CMD=rest
```

**Comandos**

```bash
npm run dev           # ts-node src/index.ts
npm run start         # nodemon src/index.ts
docker-compose up -d  # Sobe PostgreSQL
```

---

## 9. GAPs Identificados (Análise de Orquestração)

### Crítico

| # | Gap | Impacto | Recomendação |
|---|-----|---------|-------------|
| G1 | `dropSchema: true` no `data-source.ts` | **Apaga TODOS os dados a cada restart** | Remover imediatamente. Usar migrations |
| G2 | `synchronize: true` no `data-source.ts` | Altera schema automaticamente — perigoso em produção | Desativar em produção; usar `migration:run` |
| G3 | Sem middleware JWT nas rotas User (update/delete) | Usuário não autenticado pode alterar dados de outro usuário | Implementar `authMiddleware` com verificação JWT |

### Importante

| # | Gap | Recomendação |
|---|-----|-------------|
| G4 | `ProposalAssociation` sem `userID` | Sem rastreabilidade de quem criou a proposta |
| G5 | Sem paginação no `listProposal` | Grande volume pode sobrecarregar a API |
| G6 | Sem Rate Limiting | Susceptível a brute force e DoS |
| G7 | `checkEmpty` muito simples | Sem validação de formato (email, CPF, data) |
| G8 | Sem endpoint `POST /me` | Frontend não consegue buscar dados do usuário autenticado |

### Melhorias Futuras

| # | Gap | Recomendação |
|---|-----|-------------|
| G10 | Sem testes automatizados | Implementar Jest + Supertest |
| G11 | Sem documentação Swagger/OpenAPI | Adicionar `swagger-ui-express` |
| G12 | `role` não utilizado | Implementar RBAC (admin/broker/supervisor) |
| G13 | `venom-bot` como dependência morta | Remover do `package.json` |

---

## 10. Roadmap de Implementação

**Fase 1 — Estabilização (Prioridade AGORA)**
- [ ] G1/G2: Remover `dropSchema: true`, desativar `synchronize` em produção
- [ ] G3: Implementar `authMiddleware` JWT nas rotas `/updateUser` e `/deleteUser`
- [ ] G8: Adicionar endpoint `POST /me` para dados do usuário autenticado

**Fase 2 — Qualidade (Próximas sprints)**
- [ ] G4: Adicionar `userID` como FK em `proposal`
- [ ] G5: Implementar paginação em `listProposal` (`page`, `limit`)
- [ ] G6: Adicionar `express-rate-limit`
- [ ] G7: Validar CPF (dígito verificador), email (regex), datas

**Fase 3 — Produção e Escala**
- [ ] G10: Testes Jest + Supertest (>80% coverage)
- [ ] G11: Documentação OpenAPI/Swagger
- [ ] G12: Implementar RBAC por role
- [ ] G13: Remover `venom-bot` do `package.json`

---

## 11. Contrato de Integração com Frontend

1. **Autenticação:** Header `Authorization: Bearer <token>` após login
2. **Content-Type:** Sempre `application/json`
3. **Tratamento de erros:** Campo `error` na resposta indica falha — exibir `error.message`
4. **Datas:** Enviar no formato ISO 8601 (`YYYY-MM-DD`)
5. **Soft Delete:** Propostas deletadas não aparecem nas listagens — sem tratamento especial no frontend

---

## 12. Orquestração — Síntese

| # | Agent | Focus Area | Status |
|---|-------|------------|--------|
| 1 | `backend-specialist` | Arquitetura, UseCases, fluxo de dados User/Proposal | ✅ |
| 2 | `database-architect` | Schema entidades, soft delete, risco dropSchema/synchronize | ✅ |
| 3 | `security-auditor` | Gaps JWT, autenticação faltante, input validation, rate limiting | ✅ |

**Findings principais:**
- CRUD User e Proposal 100% implementados com padrão Clean Architecture sólido
- `dropSchema: true` é risco CRÍTICO — deve ser removido imediatamente
- Nenhuma rota de Proposal está protegida por JWT — vetor de ataque aberto
- Soft delete em Proposal é boa prática — mantém histórico de registros
