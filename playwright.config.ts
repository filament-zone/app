import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	projects: [
		{
			name: 'Desktop Safari',
			use: {
				...devices['Desktop Safari']
			}
		},
		{
			name: 'Desktop Chrome',
			use: {
				...devices['Desktop Chrome']
			}
		},
		{
			name: 'Mobile Chrome iOS',
			use: {
				...devices['iPhone 14 Pro Max']
			}
		},
		{
			name: 'Mobile Safari iOS',
			use: {
				...devices['iPhone 14 Pro Max']
			}
		},
		{
			name: 'Mobile Chrome Android',
			use: {
				...devices['Pixel 7']
			}
		}
	]
};

export default config;
