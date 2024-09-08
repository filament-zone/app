import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import svg from '@poppanator/sveltekit-svg';

export default defineConfig({
	plugins: [sveltekit(), svg()],
	server: {
		host: '0.0.0.0',
		port: 5173
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('chart.js')) {
						return 'chartjs';
					}
					if (id.includes('ethers')) {
						return 'ethers';
					}
					if (id.includes('chartjs-plugin-datalabels')) {
						return 'chartjs-plugin-datalabels';
					}
				}
			}
		}
	}
});
