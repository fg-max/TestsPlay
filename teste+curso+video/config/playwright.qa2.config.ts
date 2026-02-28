import { defineConfig, devices } from '@playwright/test';

// Config standalone para rodar testes sem autenticação prévia
// Ambiente: QA-2

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: false,
  retries: 1,
  workers: 1,
  timeout: 180000,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: 'https://fluencypass-git-qa-1-idfp.vercel.app',
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    actionTimeout: 20000,
    navigationTimeout: 30000,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium-qa2',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
