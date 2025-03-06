<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Chart } from 'chart.js';
	import { browser } from '$app/environment';
	import { eventListener } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import { type IAbstractLineChartProps } from '$lib/types';

	let {
		chartInstance = $bindable(),
		chartCanvasInstance = $bindable(),
		chartData,
		chartOptions,
		className = '',
		plugins = [],
		styles
	}: IAbstractLineChartProps = $props();

	let chartOptionsLocal = $derived({
		...chartOptions,
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			...chartOptions.scales,
			y: {
				...chartOptions.scales?.y,
				ticks: {
					...chartOptions.scales?.y?.ticks,
					padding: 10
				}
			}
		}
	});

	onMount(() => {
		if (!chartCanvasInstance) {
			return;
		}
		if (browser) {
			chartInstance = new Chart(chartCanvasInstance, {
				type: 'line',
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
		if (
			chartInstance &&
			chartData &&
			JSON.stringify(chartData) !== JSON.stringify(chartInstance.data)
		) {
			chartInstance.data = chartData;
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
	<canvas bind:this={chartCanvasInstance} width="100%" height="100%"></canvas>
</div>
