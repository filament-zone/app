/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		colors: {
			'primary-white': 'var(--primary-white)',
			default: 'var(--default)',
			background: 'var(--background)',
			filaMint: 'var(--filaMint)',
			'filaMint-100': 'var(--filaMint-100)',
			'filaMint-200': 'var(--filaMint-200)',
			'filaMint-300': 'var(--filaMint-300)',
			'filaMint-400': 'var(--filaMint-400)',
			'filaMint-500': 'var(--filaMint-500)',
			darkNet: 'var(--darkNet)',
			foreground: 'var(--foreground)'
		}
	},
	plugins: []
};
