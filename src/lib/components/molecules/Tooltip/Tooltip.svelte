<script lang="ts">
	import { Tooltip } from '@svelte-plugins/tooltips';
	import { screenDetect } from '$lib/helpers';

	interface ITooltipProps {
		tooltipContent: string;
		children?: import('svelte').Snippet;
	}

	let { tooltipContent, children }: ITooltipProps = $props();

	const screenTypeStore = screenDetect();
	let isLayoutLg = $derived($screenTypeStore.isLayoutLg);
</script>

<Tooltip content={tooltipContent} theme="custom-tooltip" action={isLayoutLg ? 'hover' : 'click'}>
	{@render children?.()}
</Tooltip>

<style lang="less">
	:global(.tooltip.custom-tooltip) {
		top: 0 !important;
	}
</style>
