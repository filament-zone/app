<script lang="ts">
	import { Typography } from '$lib/components';
	import type { IProgressBarProps } from '$lib/types';

	export let used: IProgressBarProps['used'] = 35;
	export let total: IProgressBarProps['total'] = 100;
	export let displayLabel: IProgressBarProps['displayLabel'] = false;

	export let styles: string = '';

	const usedPercentage = (used / total) * 100;
	const leftPercentage = ((total - used) / total) * 100;

	const borderRadius = '4px';
</script>

<div class={`flex flex-row w-full h-6 ${$$props.class} relative`} style={styles}>
	<div
		class={`h-auto`}
		style="width: {usedPercentage}%; background-color: #3E3E3E; border-bottom-left-radius: {borderRadius}; border-top-left-radius: {borderRadius};"
	></div>
	<div
		class={`h-auto`}
		style="width: {leftPercentage}%;  border-bottom-right-radius: {borderRadius}; border-top-right-radius: {borderRadius};"
	></div>
	{#if displayLabel}
		<Typography variant="caption" class="absolute left-1/2 -translate-x-1/2"
			>{usedPercentage}%</Typography
		>
	{/if}
</div>
