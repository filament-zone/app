<script lang="ts">
	import { Input, Dropdown } from '$lib/components';
	import { type ISearchSelectProps } from '$lib/types';

	export let value: ISearchSelectProps['value'] = { inputValue: '', dropdownValue: null };
	export let onChange: ISearchSelectProps['onChange'];
	export let inputProps: ISearchSelectProps['inputProps'];
	export let dropdownProps: ISearchSelectProps['dropdownProps'];

	$: {
		if (onChange) {
			onChange(value);
		}
	}
</script>

<div class="flex flex-row">
	<Input
		style="border-top-right-radius: 0; border-bottom-right-radius: 0"
		value={value?.inputValue}
		{...inputProps}
	/>
	<Dropdown
		style="border-top-left-radius: 0; border-bottom-left-radius: 0"
		value={value?.dropdownValue}
		{...dropdownProps}
	/>
</div>
