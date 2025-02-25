<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import { Chart } from 'chart.js';
	import { browser } from '$app/environment';
	import { eventListener, screenDetect } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import { type ChartInstance, type IAbstractPieChartProps } from '$lib/types';

	interface Props {
		chartData: IAbstractPieChartProps['chartData'];
		chartInstance: IAbstractPieChartProps['chartInstance'];
		chartCanvasInstance: IAbstractPieChartProps['chartCanvasInstance'];
		plugins: IAbstractPieChartProps['plugins'];
	}

	let {
		chartData,
		chartInstance = $bindable(),
		chartCanvasInstance = $bindable(),
		plugins
	}: Props = $props();

	const screenTypeStore = screenDetect();
	let currentScreen = $derived($screenTypeStore.currentScreen);

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

	run(() => {
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
