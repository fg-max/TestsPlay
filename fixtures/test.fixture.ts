import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

/**
 * Test Fixture — estende o test base do Playwright com objetos customizados.
 *
 * Uso nos testes:
 *   import { test, expect } from '../fixtures/test.fixture';
 *
 *   test('meu teste', async ({ loginPage }) => {
 *     await loginPage.goto();
 *     // ...
 *   });
 */

type TestFixtures = {
    loginPage: LoginPage;
};

export const test = base.extend<TestFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});

export { expect } from '@playwright/test';
