import { expect, test } from '@playwright/test';
import { routes } from '$lib/constants';

test.describe('Page-2', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(routes.PAGE_2.SUBPAGE_1);
	});

	test('Navigate to subpage-1', async ({ page }) => {
		await page.getByTestId(routes.PAGE_2.SUBPAGE_1).click();
		await expect(page).toHaveURL(routes.PAGE_2.SUBPAGE_1);
	});

	test('Navigate to subpage-2', async ({ page }) => {
		await page.getByTestId(routes.PAGE_2.SUBPAGE_2).click();
		await expect(page).toHaveURL(routes.PAGE_2.SUBPAGE_2);
	});

	test('Navigate to subpage-3', async ({ page }) => {
		await page.getByTestId(routes.PAGE_2.SUBPAGE_3.ROOT).click();
		await expect(page).toHaveURL(routes.PAGE_2.SUBPAGE_3.ROOT);
	});
});
