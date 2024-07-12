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

	test('should open correct URLs when social icons are clicked', async ({ page, context }) => {
		const [newPage] = await Promise.all([
			context.waitForEvent('page'),
			page.click('img[alt="logo-github"]')
		]);
		await newPage.waitForLoadState();
		expect(newPage.url()).toBe('https://github.com/filament-zone');

		const [linkedInPage] = await Promise.all([
			context.waitForEvent('page'),
			page.click('img[alt="logo-linkedin"]')
		]);
		await linkedInPage.waitForLoadState();
		expect(linkedInPage.url()).toBe('https://www.linkedin.com/company/filament-zone');
	});
});
