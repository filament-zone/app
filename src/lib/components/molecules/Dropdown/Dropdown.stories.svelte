<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Dropdown } from '$lib/components';
	import type { IDropdownProps } from '$lib/types';

	export const meta = {
		title: 'Molecules/Dropdown',
		component: Dropdown
	};

	const options: IDropdownProps['options'] = [
		{ label: 'label 1', value: 'label_1' },
		{ label: 'label 2', value: 'label_2' },
		{ label: 'label 3', value: 'label_3' },
		{ label: 'label 4', value: 'label_4' }
	];
</script>

<Template let:args>
	<Dropdown {...args} />
</Template>

<Story name="Primary" args={{ options }} />
<Story name="isSearchable" args={{ options, isSearchable: true }} />
<Story name="isSearchable isMulti" args={{ options, isSearchable: true, isMulti: true }} />
<Story name="isMulti" args={{ options, isMulti: true }} />
<Story name="isCreatable" args={{ options, isCreatable: true }} />
<Story name="isCreatable isSearchable" args={{ options, isCreatable: true, isSearchable: true }} />
<Story
	name="isCreatable isSearchable isMulti"
	args={{ options, isCreatable: true, isSearchable: true, isMulti: true }}
/>
<Story name="isCreatable isMulti" args={{ options, isCreatable: true, isMulti: true }} />
