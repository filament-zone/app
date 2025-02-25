<script lang="ts">
	import CloseIcon from '$lib/assets/icons/x.svg?component';
	import { type ISelectedItemMultiProps } from '$lib/types';
	import { Typography } from '$lib/components';

	interface Props {
		option: ISelectedItemMultiProps['option'];
		displayOnly?: ISelectedItemMultiProps['displayOnly'];
		onCloseIconClick?: ISelectedItemMultiProps['onCloseIconClick'];
	}

	let { option, displayOnly = false, onCloseIconClick = () => {} }: Props = $props();
</script>

x
<div class="selected-item-multi">
	<Typography variant="h6">{option.label}</Typography>
	{#if !displayOnly}
		<div class="cursor-pointer" onclick={onCloseIconClick} aria-hidden="true">
			<CloseIcon stroke="white" height="12px" width="12px" />
		</div>
	{/if}
</div>

<style lang="less">
	.selected-item-multi {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 4px;
		width: fit-content;
		max-height: 16px;
		background-color: black;
		padding: 10px 6px;
		border-radius: 4px;
		text-wrap: nowrap;
	}
</style>
