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
		await page.getByTestId('nav-item-governance').click();
		await page.getByTestId('list-item-governance').click();
		await expect(page).toHaveURL('/governance');
		await page.getByTestId('nav-item-staking').click();
		await page.getByTestId('list-item-staking').click();
		await expect(page).toHaveURL('/staking');
	});

	test('should navigate to the page-3 when a link is clicked', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });

		await page.getByTestId('nav-item-campaigns').click();

		// Wait for the element to be present in the DOM
		await page.waitForSelector('[data-testid="list-item-campaigns/manage"]');

		// Force click on the element, even if it's hidden
		await page.evaluate(() => {
			const element = document.querySelector('[data-testid="list-item-campaigns/manage"]');
			if (element) {
				(element as HTMLElement).click();
			}
		});

		await page.waitForNavigation();
		await expect(page.url()).toContain('/campaigns/manage');
	});
});
