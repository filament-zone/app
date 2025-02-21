<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onDestroy, onMount } from 'svelte';
	import { Chart } from 'chart.js';
	import { browser } from '$app/environment';
	import { eventListener } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import { type IAbstractLineChartProps } from '$lib/types';

	interface Props {
		chartInstance: IAbstractLineChartProps['chartInstance'];
		chartCanvasInstance: IAbstractLineChartProps['chartCanvasInstance'];
		chartData: IAbstractLineChartProps['chartData'];
		chartOptions: IAbstractLineChartProps['chartInstance']['options'];
		className?: IAbstractLineChartProps['className'];
		plugins?: IAbstractLineChartProps['plugins'];
		styles: string;
	}

	let {
		chartInstance = $bindable(),
		chartCanvasInstance = $bindable(),
		chartData,
		chartOptions,
		className = '',
		plugins = [],
		styles
	}: Props = $props();

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

	run(() => {
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
