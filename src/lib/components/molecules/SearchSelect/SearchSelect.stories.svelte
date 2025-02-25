<script module lang="ts">
	import { Template, Story } from '@storybook/addon-svelte-csf';
	import { SearchSelect } from '$lib/components';
	import SearchIcon from '$lib/assets/icons/search.svg?component';
	import { type ISearchSelectProps } from '$lib/types';

	export const meta = {
		title: 'Molecules/SearchSelect',
		component: SearchSelect
	};

	const data: ISearchSelectProps = {
		onChange: (value) => {
			console.log('value', value);
		},
		inputProps: {
			placeholder: 'Search validators...',
			LeftContent: SearchIcon
		},
		dropdownProps: {
			options: [
				{ label: 'label 1', value: 'label_1' },
				{ label: 'label 2', value: 'label_2' },
				{ label: 'label 3', value: 'label_3' },
				{ label: 'label 4', value: 'label_4' }
			]
		}
	};
</script>

<Template >
	{#snippet children({ args })}
		<div class="w-[400px]">
			<SearchSelect {...args} />
		</div>
	{/snippet}
</Template>

<Story name="Primary" args={data} />
