import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('Open modal connect wallet', async ({ page }) => {
		await page.getByTestId('connect-wallet-button').click();
		await expect(page.locator('.modal-container')).toBeVisible();
		await page.getByTestId('confirmation-modal-cancel').click();
		await expect(page.locator('.modal-container')).not.toBeVisible();
	});
});
