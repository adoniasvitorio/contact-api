# Contacts API

API REST para gerenciamento de contatos construída com Node.js, TypeScript e MongoDB, seguindo princípios de Clean Architecture, SOLID e injeção de dependência manual.

## Tecnologias Utilizadas
- Node.js
- TypeScript
- Express
- MongoDB (driver nativo)
- Docker
- Jest (testes)
- Swagger (documentação API)

## Estrutura do Projeto
```
src/
├── domain/              # Regras de negócio
├── application/         # Casos de uso
├── infra/               # Banco de dados e implementações externas
├── main/                # Entrada da aplicação (HTTP, DI, server)
├── shared/              # Utilitários compartilhados
└── config/              # Configurações
```

## Requisitos

- Node.js 24+
- Docker (opcional, recomendado)
- MongoDB (local ou via Docker)

# Instalação
1. Clone o repositório:
```
git clone https://github.com/adoniasvitorio/contact-api.git
```
2. Instale as dependências:
```
npm install
```

## Executando Localmente

```
npm run dev
```

## Executando com Docker
```
docker-compose up --build
```

> API disponível em: `http://localhost:3000`

> Documentação Swagger: `http://localhost:3000/docs`

## Endipoints Principais
- `POST /contacts` - Criar contato
- `GET /contacts` - Listar contatos
- `GET /contacts/:id` - Obter contato por ID
- `PUT /contacts/:id` - Atualizar contato
- `DELETE /contacts/:id` - Excluir contato

- `GET /health` - Verificar saúde da API

## Exemplo de Requisição

### Criar um novo contato
```bash
curl -X POST http://localhost:3000/contacts \
-H "Content-Type: application/json" \
-d '{
  "name": "João Silva",
  "birthDate": "1990-05-15",
  "sex": "M"
}'
```

### Listar contatos ativos
```bash
curl http://localhost:3000/contacts
```

### Buscar contato por ID
```bash
curl http://localhost:3000/contacts/{id}
```

### Desativar contato
```bash
curl -X DELETE http://localhost:3000/contacts/{id}
```

### Excluir contato permanentemente
```bash
curl -X DELETE http://localhost:3000/contacts/{id}
```

### Health Check
```bash
curl http://localhost:3000/health
```

## Testes
```
npm test
npm test:e2e
npm test:unit
```