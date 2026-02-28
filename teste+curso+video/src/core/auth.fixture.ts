import { test as base, Page, BrowserContext } from '@playwright/test';
import path from 'path';

const AUTH_FILE = path.join(__dirname, '..', 'auth.json');

/**
 * Auth Fixture — gerencia autenticação persistida via storageState.
 *
 * Uso:
 *   1. O projeto "setup" no playwright.config.ts executa auth.setup.ts
 *   2. O setup faz login real e salva o estado em auth.json
 *   3. Os projetos chromium/firefox reutilizam auth.json
 *
 * Isso elimina login repetido em cada teste.
 */

// Fixture que fornece um contexto já autenticado
export const test = base.extend<{ authenticatedPage: Page }>({
    authenticatedPage: async ({ browser }, use) => {
        const context: BrowserContext = await browser.newContext({
            storageState: AUTH_FILE,
        });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
});

export { expect } from '@playwright/test';
export { AUTH_FILE };
