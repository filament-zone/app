<script lang="ts">
	import { Button, List, MenuPopover } from '$lib/components';
	import MoreVerticalIcon from '$lib/assets/icons/more-vertical.svg?component';
	import { type ITableValidatorOptionsComponentProps } from '$lib/types';

	interface Props {
		buttonOnClick?: ITableValidatorOptionsComponentProps['buttonOnClick'];
		buttonLabel: ITableValidatorOptionsComponentProps['buttonLabel'];
		options: ITableValidatorOptionsComponentProps['options'];
		disabled: ITableValidatorOptionsComponentProps['disabled'];
	}

	let {
		buttonOnClick = () => {},
		buttonLabel,
		options,
		disabled
	}: Props = $props();
</script>

<div class="flex flex-row items-center">
	<Button on:click={buttonOnClick} class="mr-4" {disabled}>{buttonLabel}</Button>
	{#if options}
		<MenuPopover>
			{#snippet trigger()}
						<div  class="cursor-pointer">
					<MoreVerticalIcon />
				</div>
					{/snippet}
			{#snippet content()}
						<List  {options} />
					{/snippet}
		</MenuPopover>
	{/if}
</div>
