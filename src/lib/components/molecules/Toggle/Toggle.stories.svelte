<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Toggle } from '$lib/components';
	import type { IToggleProps } from '$lib/components/molecules/Toggle/Toggle.svelte';

	export const meta = {
		title: 'Molecules/Toggle',
		component: Toggle
	};

	const tableToggleValue: string[] = [];

	let tableToggleOptions: IToggleProps<string>['options'] = [
		{ value: 'views', label: 'Views' },
		{ value: 'clicks', label: 'Clicks' },
		{ value: 'conversions', label: 'Conversions' }
	];
</script>

<Template let:args>
	<Toggle {...args} />
</Template>

<Story name="Primary" args={{ options: tableToggleOptions, value: tableToggleValue }} />
<Story
	name="Multi"
	args={{ options: tableToggleOptions, value: tableToggleValue, isMulti: true }}
/>
