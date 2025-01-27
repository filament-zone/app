<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Ticker } from '$lib/components';

	export const meta = {
		title: 'Molecules/Ticker',
		component: Ticker
	};
</script>

<Template let:args>
	<Ticker {...args} />
</Template>

<Story name="Primary" args={{ name: 'Test Name', date: '2025-02-02', status: 'Approved' }} />
