<script lang="ts">
	import type { IProgressBarProps } from '$lib/types';

	export let used: IProgressBarProps['used'] = 35;
	export let total: IProgressBarProps['total'] = 100;

	export let styles: string = '';

	const usedPercentage = (used / total) * 100;
	const leftPercentage = ((total - used) / total) * 100;

	const borderRadius = '1px';
</script>

<div
	class={`flex flex-row w-full bg-gray-200 rounded-full h-6 dark:bg-gray-700 ${$$props.class}`}
	style={styles}
>
	<div
		class={`h-auto`}
		style="width: {usedPercentage}%; background-color: var(--filaMint-100); border-bottom-left-radius: {borderRadius}; border-top-left-radius: {borderRadius};"
	></div>
	<div
		class={`h-auto`}
		style="width: {leftPercentage}%; background-color: var(--filaMint-700); border-bottom-right-radius: {borderRadius}; border-top-right-radius: {borderRadius};"
	></div>
</div>
