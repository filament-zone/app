<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js';
	import { browser } from '$app/environment';
	import { eventListener, screenDetect } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import { type ChartInstance, type IAbstractPieChartProps } from '$lib/types';

	let {
		chartData,
		chartInstance = $bindable(),
		chartCanvasInstance = $bindable(),
		plugins
	}: IAbstractPieChartProps = $props();

	const screenTypeStore = screenDetect();
	let currentScreen = $derived($screenTypeStore.currentScreen);

	onMount(() => {
		if (!chartCanvasInstance) {
			return;
		}
		if (browser) {
			chartInstance = new Chart(chartCanvasInstance, {
				type: 'pie',
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							enabled: false
						}
					},
					responsive: true
				},
				plugins: [...plugins]
			}) as ChartInstance<'pie'>;
		}
	});

	$effect(() => {
		if (currentScreen && chartInstance) {
			if (chartInstance) {
				chartInstance.update();
			}
		}
	});

	eventListener(
		'resize',
		throttle(() => {
			chartInstance?.resize();
		}, 500)
	);
</script>

<div class="chart-container relative w-full">
	<canvas bind:this={chartCanvasInstance}></canvas>
</div>
