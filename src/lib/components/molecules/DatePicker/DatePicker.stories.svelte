<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { DatePicker } from '$lib/components';

	export const meta = {
		title: 'Molecules/DatePicker',
		component: DatePicker
	};
</script>

<Template let:args>
	<DatePicker {...args} />
</Template>

<Story name="Primary" args={{ label: 'DatePicker Label' }} />
<Story name="Disabled" args={{ label: 'DatePicker Label', disabled: true }} />
