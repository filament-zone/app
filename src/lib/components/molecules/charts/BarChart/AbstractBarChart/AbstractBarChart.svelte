<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onDestroy, onMount } from 'svelte';
	import { Chart } from 'chart.js';
	import { browser } from '$app/environment';
	import { eventListener } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import { type IAbstractBarChartProps } from '$lib/types';

	interface Props {
		chartInstance: IAbstractBarChartProps['chartInstance'];
		chartCanvasInstance: IAbstractBarChartProps['chartCanvasInstance'];
		chartData: IAbstractBarChartProps['chartData'];
		chartOptions: IAbstractBarChartProps['chartInstance']['options'];
		className: IAbstractBarChartProps['className'];
		plugins?: IAbstractBarChartProps['plugins'];
		styles: string;
	}

	let {
		chartInstance = $bindable(),
		chartCanvasInstance = $bindable(),
		chartData,
		chartOptions,
		className,
		plugins = [],
		styles
	}: Props = $props();

	let chartOptionsLocal = $derived({
		...chartOptions,
		responsive: true,
		maintainAspectRatio: false
	});

	onMount(() => {
		if (browser) {
			chartInstance = new Chart(chartCanvasInstance, {
				type: 'bar',
				data: chartData,
				options: {
					...chartOptionsLocal
				},
				plugins: [...plugins]
			});
		}
	});

	onDestroy(() => {
		chartInstance?.destroy();
	});

	run(() => {
		if (chartInstance && chartData) {
			chartInstance.data = chartData;
			chartInstance.update();
		}
	});

	run(() => {
		if (chartInstance && chartOptions) {
			chartInstance.options = { ...chartInstance.options, ...chartOptions };
			chartInstance.update();
		}
	});

	eventListener(
		'resize',
		throttle(() => {
			chartInstance?.resize();
		}, 500)
	);
</script>

<div class={`chart-container w-full relative ${className}`} style={styles}>
	<canvas bind:this={chartCanvasInstance}></canvas>
</div>
