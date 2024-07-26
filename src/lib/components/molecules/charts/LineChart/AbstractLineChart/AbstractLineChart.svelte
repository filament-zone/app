<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Chart } from 'chart.js';
	import { browser } from '$app/environment';
	import { eventListener } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import { type IAbstractLineChartProps } from '$lib/types';

	export let chartInstance: IAbstractLineChartProps['chartInstance'];
	export let chartCanvasInstance: IAbstractLineChartProps['chartCanvasInstance'];
	export let chartData: IAbstractLineChartProps['chartData'];
	export let chartOptions: IAbstractLineChartProps['chartInstance']['options'];
	export let className: IAbstractLineChartProps['className'];
	export let plugins: IAbstractLineChartProps['plugins'] = [];
	export let styles: string;

	$: chartOptionsLocal = {
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
	};

	onMount(() => {
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

	$: if (chartInstance && chartData) {
		chartInstance.data = chartData;
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
	<canvas bind:this={chartCanvasInstance} width="100%" height="100%" />
</div>
