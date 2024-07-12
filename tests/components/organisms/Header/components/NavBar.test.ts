import { test, expect } from '@playwright/test';

test.describe('NavBarComponent', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should navigate to the page-1 when a link is clicked', async ({ page }) => {
		await page.getByTestId('nav-item-page1').click();
		await expect(page).toHaveURL('/page-1');
	});

	test('should navigate to the page-2 and its subpages when a link is clicked', async ({
		page
	}) => {
		await page.getByTestId('nav-item-page2').click();
		await page.getByTestId('list-item-page-2/subpage-1').click();
		await expect(page).toHaveURL('/page-2/subpage-1');
		await page.getByTestId('nav-item-page2').click();
		await page.getByTestId('list-item-page-2/subpage-2').click();
		await expect(page).toHaveURL('/page-2/subpage-2');
		await page.getByTestId('nav-item-page2').click();
		await page.getByTestId('list-item-page-2/subpage-3').click();
		await expect(page).toHaveURL('/page-2/subpage-3');
	});

	test('should navigate to the page-3 when a link is clicked', async ({ page }) => {
		await page.getByTestId('nav-item-page3').click();
		await expect(page).toHaveURL('/page-3');
	});
});
