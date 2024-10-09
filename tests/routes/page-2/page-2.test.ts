import { expect, test } from '@playwright/test';
import { routes } from '$lib/constants/routes.constants';

test.describe('DELEGATES Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(routes.DELEGATES.SUBPAGE_1.ROOT);
	});

	test('Navigate to subpage-1', async ({ page }) => {
		await page.getByTestId(routes.DELEGATES.SUBPAGE_1.ROOT).click();
		await expect(page).toHaveURL(routes.DELEGATES.SUBPAGE_1.ROOT);
	});

	test('Navigate to subpage-2', async ({ page }) => {
		await page.getByTestId(routes.DELEGATES.SUBPAGE_2.ROOT).click();
		await expect(page).toHaveURL(routes.DELEGATES.SUBPAGE_2.ROOT);
	});

	test('Navigate to subpage-3', async ({ page }) => {
		await page.getByTestId(routes.DELEGATES.SUBPAGE_3.ROOT).click();
		await expect(page).toHaveURL(routes.DELEGATES.SUBPAGE_3.ROOT);
	});
});
