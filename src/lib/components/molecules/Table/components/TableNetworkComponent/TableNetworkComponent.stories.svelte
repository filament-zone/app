<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import TableNetworkComponent from '$lib/components/molecules/Table/components/TableNetworkComponent/TableNetworkComponent.svelte';
	import FilamentLogo from '$lib/assets/logos/logo-filament.svg?component';

	export const meta = {
		title: 'Molecules/Table/Components/TableNetworkComponent',
		component: TableNetworkComponent
	};
</script>

<Template let:args>
	<TableNetworkComponent {...args} />
</Template>

<Story name="Primary" args={{ Icon: FilamentLogo, label: 'Filament Network', ticker: 'FILA' }} />
