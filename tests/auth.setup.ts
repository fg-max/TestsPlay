import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

/**
 * auth.setup.ts — Setup global de autenticação.
 *
 * Este arquivo é executado uma vez pelo projeto "setup" antes dos testes.
 * Faz login real e persiste o estado de autenticação em auth.json.
 */

const authFile = 'auth.json';

test('autenticar e salvar estado', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Arrange
    await loginPage.goto();

    // Act — login com credenciais de teste
    await loginPage.login(
        process.env.TEST_USER_EMAIL || 'qa@example.com',
        process.env.TEST_USER_PASSWORD || 'password123'
    );

    // Assert — verificar que login foi bem-sucedido
    await page.waitForURL('**/dashboard**');
    await expect(page).toHaveURL(/dashboard/);

    // Persistir estado de autenticação
    await page.context().storageState({ path: authFile });
});
