import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests
 *
 * Testes de regressão visual usando screenshots comparativos.
 * O Playwright compara automaticamente com snapshots de referência.
 *
 * Para atualizar os snapshots de referência:
 *   npx playwright test tests/visual/ --update-snapshots
 */

test.describe('Visual Regression', () => {
    test('login page visual snapshot', async ({ page }) => {
        // Arrange
        await page.goto('/login');
        await page.waitForLoadState('networkidle');

        // Assert — compara com snapshot de referência
        await expect(page).toHaveScreenshot('login-page.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.05, // tolera até 5% de diferença
        });
    });

    test('dashboard visual snapshot', async ({ page }) => {
        // Arrange
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle');

        // Assert
        await expect(page).toHaveScreenshot('dashboard-page.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.05,
        });
    });
});
