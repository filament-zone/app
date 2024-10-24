import { test, expect } from '@playwright/test';

test.describe('Filament Zone Component', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should render Filament Zone header and logos', async ({ page }) => {
		await expect(page.locator('text=Filament Zone')).toBeVisible();
		await expect(page.locator('img[alt="logo-filament-footer"]')).toBeVisible();
		await expect(page.locator('img[alt="logo-github"]')).toBeVisible();
		await expect(page.locator('img[alt="logo-linkedin"]')).toBeVisible();
		await expect(page.locator('img[alt="logo-twitter"]')).toBeVisible();
	});
});
