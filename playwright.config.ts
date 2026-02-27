import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 4 : undefined,
    reporter: [
        ['html', { open: 'never' }],
        ['allure-playwright'],
        ['list'],
    ],

    use: {
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 15000,
        navigationTimeout: 30000,
        locale: 'pt-BR',
        timezoneId: 'America/Sao_Paulo',
    },

    projects: [
        // Setup project — autenticação global
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
        },
        // Chromium
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        // Firefox
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                storageState: 'auth.json',
            },
            dependencies: ['setup'],
        },
    ],
});
