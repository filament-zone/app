import { test, expect } from '@playwright/test';

test.describe('NavBarComponent', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should navigate to the page-1 when a link is clicked', async ({ page }) => {
		await page.getByTestId('nav-item-overview').click();
		await expect(page).toHaveURL('/overview');
	});

	test('should navigate to the page-2 and its subpages when a link is clicked', async ({
		page
	}) => {
		await page.getByTestId('nav-item-delegates').click();
		await page.getByTestId('list-item-delegates/subpage-1').click();
		await expect(page).toHaveURL('/delegates/subpage-1');
		await page.getByTestId('nav-item-delegates').click();
		await page.getByTestId('list-item-delegates/subpage-2').click();
		await expect(page).toHaveURL('/delegates/subpage-2');
		await page.getByTestId('nav-item-delegates').click();
		await page.getByTestId('list-item-delegates/subpage-3').click();
		await expect(page).toHaveURL('/delegates/subpage-3');
	});

	test('should navigate to the page-3 when a link is clicked', async ({ page }) => {
		await page.getByTestId('nav-item-campaigns').click();
		await expect(page).toHaveURL('/campaigns');
	});
});
