<script module lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { DatePicker } from '$lib/components';

	export const meta = {
		title: 'Molecules/DatePicker',
		component: DatePicker
	};
</script>

<Template >
	{#snippet children({ args })}
		<DatePicker {...args} />
	{/snippet}
</Template>

<Story name="Primary" args={{ label: 'DatePicker Label' }} />
<Story name="Disabled" args={{ label: 'DatePicker Label', disabled: true }} />
