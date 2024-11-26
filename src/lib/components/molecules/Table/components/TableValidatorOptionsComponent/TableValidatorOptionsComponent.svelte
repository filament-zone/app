<script lang="ts">
	import { Button, List, MenuPopover } from '$lib/components';
	import MoreHorizontalIcon from '$lib/assets/icons/more-horizontal.svg?component';
	import { type ITableValidatorOptionsComponentProps } from '$lib/types';

	export let buttonOnClick: ITableValidatorOptionsComponentProps['buttonOnClick'];
	export let buttonLabel: ITableValidatorOptionsComponentProps['buttonLabel'];
	export let options: ITableValidatorOptionsComponentProps['options'];
	export let disabled: ITableValidatorOptionsComponentProps['disabled'];
</script>

<div class="flex flex-row items-center">
	<Button on:click={buttonOnClick} class="mr-4" {disabled}>{buttonLabel}</Button>
	{#if options}
		<MenuPopover>
			<div slot="trigger" class="cursor-pointer">
				<MoreHorizontalIcon />
			</div>
			<List slot="content" {options} />
		</MenuPopover>
	{/if}
</div>
