import { test, expect } from '@core/base.fixture';
import { userFactory } from '@data/factories/user.factory';

/**
 * Login E2E Tests
 *
 * Testes end-to-end para o fluxo de login.
 * Migrados da Orange Testing → Playwright.
 *
 * Convenções:
 * - Arrange / Act / Assert
 * - Seletores via data-test attributes
 * - Dados parametrizados via fixtures
 */

test.describe('Login', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('deve exibir o formulário de login', async ({ loginPage }) => {
        // Assert
        const isVisible = await loginPage.isLoginFormVisible();
        expect(isVisible).toBeTruthy();
    });

    test('deve fazer login com credenciais válidas', async ({ loginPage, page }) => {
        // Arrange
        const { email, password } = userFactory.validUser();

        // Act
        await loginPage.login(email, password);

        // Assert
        await expect(page).toHaveURL(/dashboard/);
    });

    test('deve exibir erro com credenciais inválidas', async ({ loginPage }) => {
        // Arrange
        const { email, password } = userFactory.invalidUser();

        // Act
        await loginPage.login(email, password);

        // Assert
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBeTruthy();
    });

    test('deve validar campos obrigatórios', async ({ loginPage, page }) => {
        // Act — tentar login sem preencher campos
        await loginPage.clickByTestId('login-button');

        // Assert — deve permanecer na página de login
        await expect(page).toHaveURL(/login/);
    });
});
