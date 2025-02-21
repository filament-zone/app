<script module lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Ticker } from '$lib/components';

	export const meta = {
		title: 'Molecules/Ticker',
		component: Ticker
	};
</script>

<Template >
	{#snippet children({ args })}
		<Ticker {...args} />
	{/snippet}
</Template>

<Story name="Primary" args={{ name: 'Test Name', date: '2025-02-02', status: 'Approved' }} />
