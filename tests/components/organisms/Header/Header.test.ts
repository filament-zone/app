import { test, expect } from '@playwright/test';

test.describe('Header Component', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should display the logo', async ({ page }) => {
		const logo = page.locator('img[alt="logo"]');
		await expect(logo).toBeVisible();

		const naturalWidth = await logo.evaluate((img) => (img as HTMLImageElement).naturalWidth);
		expect(naturalWidth).toBeGreaterThan(0);
	});

	test('should display the "Connect Wallet" button', async ({ page }) => {
		const button = page.locator('button', { hasText: 'Connect Wallet' });
		await expect(button).toBeVisible();
	});

	test('should have the correct button color', async ({ page }) => {
		const button = page.locator('button', { hasText: 'Connect Wallet' });
		await expect(button).toHaveClass(/style-highlight/);
	});
});
