import { Page, Locator } from '@playwright/test';

/**
 * BasePage — classe base para todos os Page Objects.
 *
 * Convenções:
 * - Todos os seletores devem usar data-test attributes (getByTestId)
 * - Nunca usar XPath ou seletores CSS frágeis
 * - Cada Page Object herda de BasePage
 */
export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ─── Navegação ──────────────────────────────────────────
    async navigate(path: string = '/'): Promise<void> {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    // ─── Seletores por data-test ────────────────────────────
    getByTestId(testId: string): Locator {
        return this.page.getByTestId(testId);
    }

    // ─── Ações comuns ───────────────────────────────────────
    async clickByTestId(testId: string): Promise<void> {
        await this.getByTestId(testId).click();
    }

    async fillByTestId(testId: string, value: string): Promise<void> {
        await this.getByTestId(testId).fill(value);
    }

    async getTextByTestId(testId: string): Promise<string> {
        return (await this.getByTestId(testId).textContent()) ?? '';
    }

    // ─── Esperas ────────────────────────────────────────────
    async waitForTestId(testId: string, timeout: number = 10000): Promise<void> {
        await this.getByTestId(testId).waitFor({ state: 'visible', timeout });
    }

    async waitForUrl(urlPattern: string | RegExp): Promise<void> {
        await this.page.waitForURL(urlPattern);
    }

    // ─── Screenshots ────────────────────────────────────────
    async takeScreenshot(name: string): Promise<Buffer> {
        return await this.page.screenshot({
            fullPage: true,
            path: `reports/screenshots/${name}.png`,
        });
    }

    // ─── Utilitários ────────────────────────────────────────
    async isVisible(testId: string): Promise<boolean> {
        return await this.getByTestId(testId).isVisible();
    }

    async isEnabled(testId: string): Promise<boolean> {
        return await this.getByTestId(testId).isEnabled();
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }
}
