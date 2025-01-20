import { test, expect, type TestInfo } from '@playwright/test';

test.describe('NavBarComponent', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	const isDesktop = (testInfo: TestInfo) => testInfo.project.name === 'Desktop Chrome';

	test('should navigate to the overview page when a link is clicked', async ({
		page
	}, testInfo) => {
		if (!isDesktop(testInfo)) {
			await page.getByTestId('mobile-nav-bar-button').click();
		}
		await page.getByTestId('nav-item-overview').click();
		await expect(page).toHaveURL('/overview');
	});

	test('should navigate to the staking page when a link is clicked', async ({ page }, testInfo) => {
		if (!isDesktop(testInfo)) {
			await page.getByTestId('mobile-nav-bar-button').click();
		}
		await page.getByTestId('nav-item-staking').click();
		await expect(page).toHaveURL('/staking');
	});

	test('should navigate to the governance page when a link is clicked', async ({
		page
	}, testInfo) => {
		if (!isDesktop(testInfo)) {
			await page.getByTestId('mobile-nav-bar-button').click();
		}
		await page.getByTestId('nav-item-governance').click();
		await expect(page).toHaveURL('/governance');
	});

	test('should navigate to the airdrops page when a link is clicked', async ({
		page
	}, testInfo) => {
		if (!isDesktop(testInfo)) {
			await page.getByTestId('mobile-nav-bar-button').click();
		}
		await page.getByTestId('nav-item-campaigns').click();
		await expect(page).toHaveURL('/campaigns/manage');
	});
});
