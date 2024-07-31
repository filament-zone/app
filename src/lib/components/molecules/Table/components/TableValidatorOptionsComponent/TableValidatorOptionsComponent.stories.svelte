<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { TableValidatorOptionsComponent } from '$lib/components';

	export const meta = {
		title: 'Molecules/Table/Components/TableValidatorOptionsComponent',
		component: TableValidatorOptionsComponent
	};
</script>

<Template let:args>
	<TableValidatorOptionsComponent {...args} />
</Template>

<Story name="Primary" args={{}} />
