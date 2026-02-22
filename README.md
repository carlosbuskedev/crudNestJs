# API NestJS - Sistema de Autenticação e Usuários

API RESTful desenvolvida com NestJS para gerenciamento de usuários e autenticação JWT.

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript/JavaScript
- **[MySQL](https://www.mysql.com/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação baseada em tokens
- **[Passport](http://www.passportjs.org/)** - Middleware de autenticação
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** - Hash de senhas
- **[Swagger / OpenAPI](https://docs.nestjs.com/openapi/introduction)** - Documentação interativa da API
- **[Docker](https://www.docker.com/)** - Containerização do banco de dados
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - Linting e formatação de código

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Docker e Docker Compose (para o banco de dados)
- Git

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/carlosbuskedev/crudNestJs
cd APINestjs
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USER=app
DATABASE_PASSWORD=sua_senha_aqui
DATABASE_NAME=testDB

# JWT
JWT_SECRET=seu_jwt_secret
JWT_EXPIRES_IN=3600

# Bcrypt
BCRYPT_PEPPER=seu_pepper_
BCRYPT_ROUNDS=12

# Server
PORT=3000
```

4. Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

## 🏃 Como executar

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

### Debug
```bash
npm run start:debug
```

## 📖 Documentação da API (Swagger)

Com a aplicação em execução, a documentação interativa Swagger/OpenAPI fica disponível em:

**http://localhost:3000/api**

Nela você pode:
- Ver todos os endpoints, parâmetros e respostas
- Testar as requisições diretamente no navegador
- Autenticar com JWT (botão **Authorize** → informar o token retornado no login)

## 📁 Estrutura do Projeto

```
src/
├── main.ts                 # Ponto de entrada da aplicação
├── app.module.ts           # Módulo raiz
├── config/
│   └── swagger.ts          # Configuração Swagger/OpenAPI
├── models/
│   └── user.entity.ts      # Entidade User
└── modules/
    ├── auth/               # Módulo de autenticação
    │   ├── dto/            # Data Transfer Objects
    │   ├── interfaces/     # Interfaces TypeScript
    │   ├── auth.controller.ts
    │   ├── auth.service.ts
    │   ├── auth.module.ts
    │   ├── jwt.strategy.ts
    │   └── jwt-auth.guard.ts
    └── user/               # Módulo de usuários
        ├── dto/            # Data Transfer Objects
        ├── user.controller.ts
        ├── user.service.ts
        └── user.module.ts
```

## 🔌 Endpoints da API

### Autenticação

#### `POST /auth`
Realiza login e retorna token JWT.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### Usuários

Todos os endpoints abaixo (exceto `POST /users`) requerem autenticação:

**Headers:**
```
Authorization: Bearer <token>
```

#### `POST /users`
Cria um novo usuário.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Response:**
```
"user@example.com"
```

#### `GET /users`
Lista todos os usuários.

**Response:**
```json
[
  {
    "id": 1,
    "email": "user@example.com"
  }
]
```

#### `GET /users/:id`
Retorna o email do usuário pelo ID.

**Response:**
```
"user@example.com"
```

#### `PATCH /users/:id`
Atualiza um usuário (email e/ou senha). Envie apenas os campos que deseja alterar.

**Request:**
```json
{
  "email": "novo@example.com",
  "password": "novaSenha123"
}
```

#### `DELETE /users/:id`
Remove um usuário. Retorna status **204 No Content**.

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:cov

# Testes E2E
npm run test:e2e
```

## 🛠️ Scripts Disponíveis

| Script | Descrição |
|-------|-----------|
| `npm run build` | Compila o projeto TypeScript |
| `npm run format` | Formata o código com Prettier |
| `npm run start` | Inicia a aplicação |
| `npm run start:dev` | Inicia em modo desenvolvimento (watch) |
| `npm run start:debug` | Inicia em modo debug |
| `npm run start:prod` | Inicia em modo produção |
| `npm run lint` | Executa o ESLint e corrige problemas |

## 🔐 Segurança

- Senhas são hasheadas com **bcrypt** usando **pepper** e **rounds** configuráveis
- Autenticação baseada em **JWT** (JSON Web Tokens)
- Validação de dados com **class-validator**
- Guards para proteção de rotas
- Variáveis sensíveis em arquivo `.env` (não versionado)

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `DATABASE_HOST` | Host do banco de dados | `127.0.0.1` |
| `DATABASE_PORT` | Porta do banco de dados | `3306` |
| `DATABASE_USER` | Usuário do banco de dados | `app` |
| `DATABASE_PASSWORD` | Senha do banco de dados | - |
| `DATABASE_NAME` | Nome do banco de dados | `testDB` |
| `JWT_SECRET` | Chave secreta para JWT | - |
| `JWT_EXPIRES_IN` | Tempo de expiração do token (segundos) | `3600` |
| `BCRYPT_PEPPER` | String adicional para hash de senha | - |
| `BCRYPT_ROUNDS` | Número de rounds do bcrypt | `12` |
| `PORT` | Porta da aplicação | `3000` |

## 🐳 Docker

O projeto inclui um `docker-compose.yaml` para facilitar o setup do banco de dados MySQL.

```bash
# Iniciar o banco de dados
docker-compose up -d

# Parar o banco de dados
docker-compose down

# Ver logs
docker-compose logs -f
```

## 📚 Documentação Adicional

- [Documentação NestJS](https://docs.nestjs.com/)
- [NestJS OpenAPI (Swagger)](https://docs.nestjs.com/openapi/introduction)
- [TypeORM Documentation](https://typeorm.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 👤 Autor

**Carlos**

