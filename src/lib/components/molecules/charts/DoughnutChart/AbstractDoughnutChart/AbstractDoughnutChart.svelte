<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js';
	import { browser } from '$app/environment';
	import { eventListener, screenDetect } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import { type ChartInstance, type IAbstractDoughnutChartProps } from '$lib/types';

	export let chartData: IAbstractDoughnutChartProps['chartData'];
	export let chartInstance: IAbstractDoughnutChartProps['chartInstance'];
	export let chartCanvasInstance: IAbstractDoughnutChartProps['chartCanvasInstance'];
	export let chartOptions: IAbstractDoughnutChartProps['chartInstance']['options'];
	export let plugins: IAbstractDoughnutChartProps['plugins'] = [];

	const screenTypeStore = screenDetect();
	$: currentScreen = $screenTypeStore.currentScreen;

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

	$: if (currentScreen && chartInstance && chartData) {
		if (chartInstance) {
			chartInstance.update();
		}
	}

	eventListener(
		'resize',
		throttle(() => {
			chartInstance?.resize();
		}, 500)
	);
</script>

<div class={`chart-container ${$$props.class} h-[300px] relative`}>
	<canvas bind:this={chartCanvasInstance} height="300px" class="absolute" />
</div>
