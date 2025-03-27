<script lang="ts">
	import { Input, Dropdown } from '$lib/components';
	import { type ISearchSelectProps } from '$lib/types';

	let {
		value = { inputValue: '', dropdownValue: null },
		onChange,
		inputProps,
		dropdownProps
	}: ISearchSelectProps = $props();

	$effect(() => {
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
