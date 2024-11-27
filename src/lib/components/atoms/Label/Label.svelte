<script lang="ts">
	import { Typography, Tooltip } from '$lib/components';
	import { type ILabelProps } from '$lib/types';
	import InfoIcon from '$lib/assets/icons/info.svg?component';

	export let value: ILabelProps['value'] = '';
	export let tooltipContent: ILabelProps['tooltipContent'] = '';
</script>

<div class="label">
	<Typography variant="overline">{value}</Typography>
	{#if tooltipContent}
		<Tooltip {tooltipContent}>
			<InfoIcon />
		</Tooltip>
	{/if}
</div>

<style lang="less">
	.label {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 4px;
		margin-bottom: 0.4rem;
		width: fit-content;
		opacity: 0.8;
	}
</style>
