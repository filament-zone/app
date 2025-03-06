import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svg from '@poppanator/sveltekit-svg';
import wasm from 'vite-plugin-wasm';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [sveltekit(), svg(), wasm(), tailwindcss()],
	server: {
		host: '0.0.0.0',
		port: 5173
	},
	build: {
		target: 'esnext',
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
