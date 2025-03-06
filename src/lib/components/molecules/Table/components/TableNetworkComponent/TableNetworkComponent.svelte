<script lang="ts">
	import type { ITableNetworkComponentProps } from '$lib/types';
	import { Typography } from '$lib/components';
	import GlobeIcon from '$lib/assets/icons/globe.svg?component';

	let { Icon, label, ticker }: ITableNetworkComponentProps = $props();
</script>

<div class="flex flex-row items-center">
	{#if Icon}
		<div class="mr-2">
			<Icon style="width: 24px; height: 24px" />
		</div>
	{/if}
	<div class="flex flex-col">
		<div>
			<Typography variant="caption">{label}</Typography>
		</div>
		<div class="flex flex-row items-center">
			<Typography variant="caption" color="var(--gray-200)" classNames="mr-2">{ticker}</Typography>
			<div class="aviability-indicator mr-2"></div>
			<GlobeIcon width="14px" height="14px" stroke="var(--gray-200)" />
		</div>
	</div>
</div>

<style>
	.aviability-indicator {
		background-color: green;
		border-radius: 3px;
		border: 0.5px solid green;
		display: block;
		height: 5px;
		width: 5px;
	}
</style>
