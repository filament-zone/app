<script lang="ts">
	import { Button, List, MenuPopover } from '$lib/components';
	import MoreVerticalIcon from '$lib/assets/icons/more-vertical.svg?component';
	import { type ITableValidatorOptionsComponentProps } from '$lib/types';

	let {
		buttonOnClick = () => {},
		buttonLabel,
		options,
		disabled
	}: ITableValidatorOptionsComponentProps = $props();
</script>

<div class="flex flex-row items-center">
	<Button onclick={buttonOnClick} class="mr-4" {disabled}>{buttonLabel}</Button>
	{#if options}
		<MenuPopover>
			{#snippet trigger()}
				<div class="cursor-pointer">
					<MoreVerticalIcon />
				</div>
			{/snippet}
			{#snippet content()}
				<List {options} />
			{/snippet}
		</MenuPopover>
	{/if}
</div>
