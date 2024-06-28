import type { Preview } from '@storybook/svelte';
import '$lib/styles/app.less';

const preview: Preview = {
	parameters: {
		backgrounds: {
			default: 'dark',
			values: [
				{ name: 'dark', value: '#000000' },
				{ name: 'light', value: '#ffffff' }
			]
		}
	}
};

export default preview;
