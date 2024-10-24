import { expect, test } from '@playwright/test';
import { routes } from '$lib/constants/routes.constants';

test.describe('GOVERNANCE Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(routes.GOVERNANCE.SUBPAGE_1.ROOT);
	});

	test('Navigate to subpage-1', async ({ page }) => {
		await page.getByTestId(routes.GOVERNANCE.SUBPAGE_1.ROOT).click();
		await expect(page).toHaveURL(routes.GOVERNANCE.SUBPAGE_1.ROOT);
	});

	test('Navigate to subpage-2', async ({ page }) => {
		await page.getByTestId(routes.GOVERNANCE.SUBPAGE_2.ROOT).click();
		await expect(page).toHaveURL(routes.GOVERNANCE.SUBPAGE_2.ROOT);
	});

	test('Navigate to subpage-3', async ({ page }) => {
		await page.getByTestId(routes.GOVERNANCE.SUBPAGE_3.ROOT).click();
		await expect(page).toHaveURL(routes.GOVERNANCE.SUBPAGE_3.ROOT);
	});
});
