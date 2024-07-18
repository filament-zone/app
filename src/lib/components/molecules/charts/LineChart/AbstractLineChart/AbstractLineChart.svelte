<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
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

	Chart.register(...registerables);

	$: chartOptionsLocal = {
		...chartOptions,
		responsive: true,
		maintainAspectRatio: false
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
