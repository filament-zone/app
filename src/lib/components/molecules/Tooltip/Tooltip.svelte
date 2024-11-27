<script lang="ts">
	import { Tooltip } from '@svelte-plugins/tooltips';
	import { screenDetect } from '$lib/helpers';

	export let tooltipContent: string;

	const screenTypeStore = screenDetect();
	$: isLayoutLg = $screenTypeStore.isLayoutLg;
</script>

<Tooltip content={tooltipContent} theme="custom-tooltip" action={isLayoutLg ? 'hover' : 'click'}>
	<slot />
</Tooltip>

<style lang="less">
	:global(.tooltip.custom-tooltip) {
		top: 0 !important;
	}
</style>
