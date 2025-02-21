<script lang="ts">
	import { run } from 'svelte/legacy';

	import { Input, Dropdown } from '$lib/components';
	import { type ISearchSelectProps } from '$lib/types';

	interface Props {
		value?: ISearchSelectProps['value'];
		onChange: ISearchSelectProps['onChange'];
		inputProps: ISearchSelectProps['inputProps'];
		dropdownProps: ISearchSelectProps['dropdownProps'];
	}

	let {
		value = { inputValue: '', dropdownValue: null },
		onChange,
		inputProps,
		dropdownProps
	}: Props = $props();

	run(() => {
		if (onChange) {
			onChange(value);
		}
	});
</script>

<div class="flex flex-row">
	<Input
		style="border-top-right-radius: 0; border-bottom-right-radius: 0"
		value={value?.inputValue}
		{...inputProps}
	/>
	<Dropdown
		styles="border-top-left-radius: 0; border-bottom-left-radius: 0"
		value={value?.dropdownValue}
		{...dropdownProps}
	/>
</div>
