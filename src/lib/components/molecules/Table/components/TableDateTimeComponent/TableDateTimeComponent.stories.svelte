<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { TableDateTimeComponent } from '$lib/components';

	export const meta = {
		title: 'Molecules/Table/Components/TableDateTimeComponent',
		component: TableDateTimeComponent
	};
</script>

<Template let:args>
	<TableDateTimeComponent {...args} />
</Template>

<Story name="Primary" args={{ date: new Date() }} />
