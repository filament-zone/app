<script module lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ProgressBar } from '$lib/components';

	export const meta = {
		title: 'Atoms/ProgressBar',
		component: ProgressBar
	};
</script>

<Template >
	{#snippet children({ args })}
		<ProgressBar {...args} />
	{/snippet}
</Template>

<Story
	name="Primary"
	args={{
		used: 15,
		total: 100
	}}
/>
