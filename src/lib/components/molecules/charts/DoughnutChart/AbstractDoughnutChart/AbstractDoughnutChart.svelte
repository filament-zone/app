<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js';
	import { browser } from '$app/environment';
	import { eventListener, screenDetect } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import { type ChartInstance, type IAbstractDoughnutChartProps } from '$lib/types';

	let {
		classNames,
		chartData,
		chartInstance,
		chartCanvasInstance,
		chartOptions,
		plugins = []
	}: IAbstractDoughnutChartProps = $props();

	const screenTypeStore = screenDetect();
	const currentScreen = $derived($screenTypeStore.currentScreen);

	onMount(() => {
		if (browser) {
			chartInstance = new Chart(chartCanvasInstance, {
				type: 'doughnut',
				data: chartData,
				options: {
					...chartOptions,
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						...chartOptions.plugins,
						legend: {
							display: false
						},
						tooltip: {
							enabled: false
						}
					}
				},
				plugins: [...plugins]
			}) as ChartInstance<'doughnut'>;
		}
	});

	$effect(() => {
		if (currentScreen && chartInstance && chartData) {
			if (chartInstance) {
				chartInstance.data = chartData;
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

<div class={`chart-container ${classNames} h-[300px] relative`}>
	<canvas bind:this={chartCanvasInstance} height="300px" class="absolute"></canvas>
</div>
