---
description: Setup completo do ambiente Playwright + TypeScript para testes end-to-end
---

# Setup Playwright End-to-End Testing

Workflow para configurar e rodar o framework de automação QA com Playwright.

## Pré-requisitos

- Node.js 20 LTS instalado
- VS Code com extensões recomendadas
- Acesso ao repositório GitHub

## Passos

### 1. Instalar dependências

```bash
npm ci
```

### 2. Instalar browsers Playwright

```bash
npx playwright install chromium firefox --with-deps
```

### 3. Configurar ambiente

```bash
cp .env.example .env
```

Edite `.env` com os valores corretos:
- `BASE_URL` — URL da aplicação sob teste
- `API_URL` — URL do Hasura GraphQL
- `HASURA_ADMIN_SECRET` — Secret de admin do Hasura
- `TEST_USER_EMAIL` — Email do usuário de teste
- `TEST_USER_PASSWORD` — Senha do usuário de teste

### 4. Rodar testes

```bash
# Todos os testes
npm test

# Modo visual interativo
npm run test:ui

# Com browser visível
npm run test:headed

# Modo debug
npm run test:debug

# Apenas E2E
npm run test:e2e

# Apenas API
npm run test:api

# Gravar novos testes
npm run codegen
```

### 5. Ver relatórios

```bash
# Relatório HTML do Playwright
npm run report

# Relatório Allure (requer Java)
npm run report:allure
```

### 6. Criar novo teste E2E

1. Crie o Page Object em `pages/[feature].page.ts` herdando de `BasePage`
2. Crie o arquivo de teste em `tests/e2e/[feature].spec.ts`
3. Use APENAS seletores `data-test` → `page.getByTestId('...')`
4. Siga o padrão **Arrange / Act / Assert**
5. Adicione o Page Object ao `fixtures/test.fixture.ts` se necessário

### 7. Limpar relatórios antigos

```bash
bash scripts/clear-reports.sh
```

## Convenções

- Testes: `[feature].spec.ts`
- Pages: `[feature].page.ts`
- Fixtures: `[nome].fixture.ts`
- Seletores: SEMPRE `data-test` attributes
- Estrutura: Arrange / Act / Assert
- Nunca usar XPath ou CSS frágeis
