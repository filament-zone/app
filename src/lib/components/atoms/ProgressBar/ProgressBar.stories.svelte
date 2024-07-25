<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ProgressBar } from '$lib/components';

	export const meta = {
		title: 'Atoms/ProgressBar',
		component: ProgressBar
	};
</script>

<Template let:args>
	<ProgressBar {...args} />
</Template>

<Story
	name="Primary"
	args={{
		used: 15,
		total: 100
	}}
/>
