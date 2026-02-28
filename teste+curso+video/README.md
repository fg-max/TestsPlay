# 🎭 QA Automation — Playwright + TypeScript

> Repositório de automação de testes migrado da Orange Testing para **Playwright com TypeScript**.

---

## 📋 Índice

- [Setup](#-setup)
- [Rodar Testes Localmente](#-rodar-testes-localmente)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Convenções de Nomenclatura](#-convenções-de-nomenclatura)
- [Page Object Model](#-page-object-model)
- [Fixtures](#-fixtures)
- [CI/CD](#-cicd)
- [Relatórios](#-relatórios)
- [Extensões VS Code](#-extensões-vs-code)

---

## 🚀 Setup

### Pré-requisitos

- **Node.js 20 LTS** — [download](https://nodejs.org/)
- **VS Code** com extensões recomendadas (abra o projeto e aceite a instalação)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/fg-max/qa-automation.git
cd qa-automation

# 2. Instale dependências
npm ci

# 3. Instale os browsers
npx playwright install chromium firefox --with-deps

# 4. Configure o ambiente
cp .env.example .env
# Edite .env com suas URLs e credenciais
```

Ou use o script de setup:

```bash
bash scripts/setup.sh
```

---

## 🧪 Rodar Testes Localmente

| Comando | Descrição |
|---------|-----------|
| `npm test` | Roda todos os testes |
| `npm run test:ui` | Modo visual interativo (UI Mode) |
| `npm run test:headed` | Testes com browser visível |
| `npm run test:debug` | Modo debug com Playwright Inspector |
| `npm run test:e2e` | Apenas testes end-to-end |
| `npm run test:api` | Apenas testes de API |
| `npm run test:visual` | Apenas testes de regressão visual |
| `npm run codegen` | Gravar testes interativamente |
| `npm run report` | Abrir relatório HTML |
| `npm run report:allure` | Abrir relatório Allure |

### Rodar testes específicos

```bash
# Por arquivo
npx playwright test tests/e2e/login.spec.ts

# Por tag (@smoke, @regression)
npx playwright test --grep @smoke

# Por browser
npx playwright test --project=chromium

# Com trace detalhado
npx playwright test --trace on
```

---

## 📁 Estrutura de Pastas

```
qa-automation/
├── .agent/workflows/           ← workflows do Antigravity
├── .github/workflows/          ← CI/CD (GitHub Actions)
│   ├── playwright.yml          ← pipeline principal
│   └── pr-check.yml            ← validação em PRs
├── tests/
│   ├── e2e/                    ← testes end-to-end
│   │   └── [feature].spec.ts
│   ├── api/                    ← testes de API
│   │   └── [endpoint].spec.ts
│   ├── visual/                 ← regressão visual
│   │   └── visual.spec.ts
│   └── auth.setup.ts           ← setup global de auth
├── pages/                      ← Page Object Model
│   ├── base.page.ts            ← classe base
│   └── [feature].page.ts
├── fixtures/
│   ├── auth.fixture.ts         ← contexto autenticado
│   └── test.fixture.ts         ← fixtures customizados
├── helpers/
│   ├── api.helper.ts           ← Hasura GraphQL wrapper
│   ├── db.helper.ts            ← setup de dados
│   └── date.helper.ts          ← utilitários de data
├── data/
│   ├── test-data.json          ← dados parametrizados
│   └── users.json              ← credenciais de teste
├── reports/
│   └── allure-results/
├── scripts/
│   ├── setup.sh
│   └── clear-reports.sh
├── playwright.config.ts        ← configuração multi-ambiente
├── tsconfig.json
├── package.json
├── .env.example
├── .gitignore
└── README.md                   ← você está aqui!
```

---

## 📝 Convenções de Nomenclatura

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Teste E2E | `[feature].spec.ts` | `login.spec.ts` |
| Teste API | `[endpoint].spec.ts` | `health.spec.ts` |
| Page Object | `[feature].page.ts` | `login.page.ts` |
| Fixture | `[nome].fixture.ts` | `auth.fixture.ts` |
| Helper | `[tipo].helper.ts` | `api.helper.ts` |

### Seletores — SEMPRE `data-test`

```typescript
// ✅ CORRETO — usar data-test attributes
page.getByTestId('login-button');
page.getByTestId('email-input');

// ❌ ERRADO — nunca usar XPath ou CSS frágeis
page.locator('//button[@class="btn-primary"]');
page.locator('.form > div:nth-child(2) > input');
```

### Estrutura de Teste — Arrange / Act / Assert

```typescript
test('deve fazer login com sucesso', async ({ page }) => {
  // Arrange — preparar dados e estado
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // Act — executar a ação
  await loginPage.login('user@test.com', 'password');

  // Assert — verificar resultado
  await expect(page).toHaveURL(/dashboard/);
});
```

---

## 🏗️ Page Object Model

Todos os Page Objects herdam de `BasePage`:

```typescript
import { BasePage } from './base.page';

export class MyFeaturePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate('/my-feature');
  }

  async doSomething() {
    await this.clickByTestId('my-button');
  }
}
```

---

## 🔧 Fixtures

### Auth Fixture (contexto pré-autenticado)

```typescript
import { test, expect } from '../fixtures/auth.fixture';

test('teste autenticado', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/dashboard');
  // Já está logado!
});
```

### Test Fixture (Page Objects injetados)

```typescript
import { test, expect } from '../fixtures/test.fixture';

test('teste com page object', async ({ loginPage }) => {
  await loginPage.goto();
  // LoginPage já instanciado!
});
```

---

## 🔄 CI/CD

### GitHub Actions

- **`playwright.yml`** — executa em push/PR para `main` e `develop`
  - Matrix strategy: chromium + firefox em paralelo
  - Upload automático de relatórios e screenshots de falha
  
- **`pr-check.yml`** — validação rápida em PRs
  - TypeScript type check
  - ESLint
  - Smoke tests (testes com tag `@smoke`)

### Variáveis Secretas (GitHub Settings → Secrets)

| Secret | Descrição |
|--------|-----------|
| `BASE_URL` | URL da aplicação |
| `API_URL` | URL do Hasura GraphQL |
| `HASURA_ADMIN_SECRET` | Admin secret do Hasura |

---

## 📊 Relatórios

| Tipo | Comando | Descrição |
|------|---------|-----------|
| HTML | `npm run report` | Relatório interativo do Playwright |
| Allure | `npm run report:allure` | Relatório detalhado com histórico |

### Limpar relatórios

```bash
bash scripts/clear-reports.sh
```

---

## 🧩 Extensões VS Code

O projeto inclui `.vscode/extensions.json` com recomendações automáticas:

| Extensão | Função |
|----------|--------|
| Playwright Test | UI mode, gravação, debug inline |
| ESLint | Qualidade de código |
| Prettier | Formatação automática |
| GitLens | Rastreabilidade git |
| DotENV | Highlight de .env |
| Thunder Client | Testes de API no VS Code |

---

## 📖 Referências

- [Documentação Playwright](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Allure Report](https://docs.qameta.io/allure-report/)
