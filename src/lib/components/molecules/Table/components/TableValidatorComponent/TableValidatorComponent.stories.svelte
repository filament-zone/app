<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { TableValidatorComponent } from '$lib/components';
	import FilamentLogo from '$lib/assets/logos/logo-filament.svg?component';

	export const meta = {
		title: 'Molecules/Table/Components/TableValidatorComponent',
		component: TableValidatorComponent
	};
</script>

<Template let:args>
	<TableValidatorComponent {...args} />
</Template>

<Story name="Primary" args={{ Icon: FilamentLogo, label: 'Filament Network', ticker: 'FILA' }} />
