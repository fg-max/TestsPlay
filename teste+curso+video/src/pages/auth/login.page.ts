import { BasePage } from '@core/base.page';
import { Page } from '@playwright/test';

/**
 * LoginPage — Page Object para a página de login.
 *
 * Seletores esperados (data-test attributes):
 * - data-test="email-input"
 * - data-test="password-input"
 * - data-test="login-button"
 * - data-test="login-error"
 * - data-test="forgot-password-link"
 */
export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // ─── Navegação ──────────────────────────────────────────
    async goto(): Promise<void> {
        await this.navigate('/login');
    }

    // ─── Ações ──────────────────────────────────────────────
    async login(email: string, password: string): Promise<void> {
        await this.fillByTestId('email-input', email);
        await this.fillByTestId('password-input', password);
        await this.clickByTestId('login-button');
    }

    // ─── Validações ─────────────────────────────────────────
    async getErrorMessage(): Promise<string> {
        return await this.getTextByTestId('login-error');
    }

    async isLoginFormVisible(): Promise<boolean> {
        return await this.isVisible('email-input');
    }
}
