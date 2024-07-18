<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Chart, registerables } from 'chart.js';
	import { eventListener, screenDetect } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import { type ChartInstance, type IAbstractPieChartProps } from '$lib/types';

	export let chartData: IAbstractPieChartProps['chartData'];
	export let chartInstance: IAbstractPieChartProps['chartInstance'];
	export let chartCanvasInstance: IAbstractPieChartProps['chartCanvasInstance'];
	export let plugins: IAbstractPieChartProps['plugins'];

	Chart.register(...registerables);

	const screenTypeStore = screenDetect();
	$: currentScreen = $screenTypeStore.currentScreen;

	onMount(() => {
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

	$: if (currentScreen && chartInstance) {
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

<div class="chart-container relative w-full">
	<canvas bind:this={chartCanvasInstance} />
</div>
