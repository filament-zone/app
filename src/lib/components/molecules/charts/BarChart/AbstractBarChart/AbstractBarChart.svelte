<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Chart } from 'chart.js';
	import { browser } from '$app/environment';
	import { eventListener } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import { type IAbstractBarChartProps } from '$lib/types';

	export let chartInstance: IAbstractBarChartProps['chartInstance'];
	export let chartCanvasInstance: IAbstractBarChartProps['chartCanvasInstance'];
	export let chartData: IAbstractBarChartProps['chartData'];
	export let chartOptions: IAbstractBarChartProps['chartInstance']['options'];
	export let className: IAbstractBarChartProps['className'];
	export let plugins: IAbstractBarChartProps['plugins'] = [];
	export let styles: string;

	$: chartOptionsLocal = {
		...chartOptions,
		responsive: true,
		maintainAspectRatio: false
	};

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

	$: if (chartInstance && chartData) {
		chartInstance.data = chartData;
		chartInstance.update();
	}

	$: if (chartInstance && chartOptions) {
		chartInstance.options = { ...chartInstance.options, ...chartOptions };
		chartInstance.update();
	}

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
