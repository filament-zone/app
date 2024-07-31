<script context="module" lang="ts">
	import { Template, Story } from '@storybook/addon-svelte-csf';
	import { InputTokenField } from '$lib/components';
	import FilamentLogo from '$lib/assets/logos/logo-filament.svg?component';
	import { type IInputTokenFieldProps } from '$lib/types';

	export const meta = {
		title: 'Molecules/InputTokenField',
		component: InputTokenField
	};

	const data: IInputTokenFieldProps = {
		onChange: (value) => {
			console.log('value', value);
		},
		tokenProps: {
			tokenIcon: FilamentLogo,
			tokenTicker: 'FILA'
		},
		inputProps: {}
	};
</script>

<Template let:args>
	<InputTokenField {...args} />
</Template>

<Story name="Primary" args={data} />
