<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Chart } from 'chart.js';
	import { browser } from '$app/environment';
	import { eventListener } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import { type IAbstractBarChartProps } from '$lib/types';

	let {
		chartInstance = $bindable(),
		chartCanvasInstance = $bindable(),
		chartData,
		chartOptions,
		classNames,
		plugins = [],
		styles
	}: IAbstractBarChartProps = $props();

	let chartOptionsLocal = $derived({
		...chartOptions,
		responsive: true,
		maintainAspectRatio: false
	});

	onMount(() => {
		if (!chartCanvasInstance) {
			return;
		}
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

	$effect(() => {
		if (chartInstance && chartData) {
			chartInstance.data = chartData;
			chartInstance.update();
		}
	});

	$effect(() => {
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

<div class={`chart-container w-full relative ${classNames}`} style={styles}>
	<canvas bind:this={chartCanvasInstance}></canvas>
</div>
