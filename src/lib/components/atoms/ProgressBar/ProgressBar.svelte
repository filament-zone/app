<script lang="ts">
	import { Typography } from '$lib/components';
	import type { IProgressBarProps } from '$lib/types';

	let { used = 35, total = 100, displayLabel = false, styles = '' }: IProgressBarProps = $props();

	const usedPercentage = (used / total) * 100;
	const leftPercentage = ((total - used) / total) * 100;

	const borderRadius = '4px';
</script>

<div class={`flex flex-row w-full h-full relative`} style={styles}>
	<div
		class={`h-auto`}
		style="width: {usedPercentage}%; background-color: #3E3E3E; border-bottom-left-radius: {borderRadius}; border-top-left-radius: {borderRadius};"
	></div>
	<div
		class={`h-auto`}
		style="width: {leftPercentage}%;  border-bottom-right-radius: {borderRadius}; border-top-right-radius: {borderRadius};"
	></div>
	{#if displayLabel}
		<Typography
			variant="caption"
			classNames="absolute left-1/2 -translate-x-1/2 h-full items-center flex"
			>{usedPercentage.toFixed(0)}%</Typography
		>
	{/if}
</div>
