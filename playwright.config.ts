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
			name: 'Desktop Chrome',
			use: {
				...devices['Desktop Chrome'],
				viewport: { width: 1280, height: 720 }
			}
		},
		{
			name: 'Mobile Chrome Android',
			use: {
				...devices['Pixel 7'],
				viewport: { width: 767, height: 464 }
			}
		}
	]
};

export default config;
