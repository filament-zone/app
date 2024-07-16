<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';
	import { browser } from '$app/environment';
	import { eventListener } from '$lib/helpers';
	import { throttle } from '$lib/utils';
	import type { ChartInstance, ILineChartProps } from '$lib/types';
	import { externalTooltipHandler } from './externalTooltip';
	import { verticalLinePlugin } from './verticalLinePlugin';

	export let chartInstance: ChartInstance<'line'>;
	export let chartCanvasInstance: ILineChartProps['chartCanvasInstance'];
	export let data: ILineChartProps['data'];

	export let styles: string;

	$: x2Labels = data?.labels?.map((label) => label);

	Chart.register(...registerables);

	const lineColors = ['#e8fbff', '#86e9ff', '#9feeff'];
	const backgroundColors = [
		'rgba(232, 251, 255, 0.1)',
		'rgba(134, 233, 255, 0.1)',
		'rgba(159, 238, 255, 0.1)'
	];

	const chartData = {
		labels: data?.labels?.length ? [...(data?.labels as string[])] : [],
		datasets:
			data?.datasets?.map((dataset, index) => {
				return {
					label: dataset.label,
					data: [...dataset.data],
					pointRadius: 0,
					borderColor: lineColors[index],
					tension: 0.2,
					borderWidth: 1.4,
					backgroundColor: backgroundColors[index]
				};
			}) ?? []
	};

	const chartOptions: ChartInstance<'line'>['options'] = {
		scales: {
			y: {
				display: true,
				min: 0,
				type: 'logarithmic',
				ticks: {
					font: {
						size: 14,
						weight: 500
					},
					maxRotation: 0,
					autoSkip: true,
					autoSkipPadding: 20
				},
				grid: {
					color: '#7c7c7c',
					drawTicks: false
				}
			},
			x: {
				display: false,
				grid: {
					color: '#7c7c7c',

					display: false
				}
			},
			x2: {
				offset: true,
				position: 'bottom',
				labels: x2Labels,
				ticks: {
					font: {
						size: 14,
						weight: 500
					},
					autoSkip: true,
					autoSkipPadding: 20
				},
				border: {
					display: true,
					color: '#ADADAE',
					width: 2
				}
			}
		},
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				enabled: false,
				mode: 'index',
				external: externalTooltipHandler,
				intersect: false
			}
		},
		responsive: true,
		maintainAspectRatio: false
	};

	onMount(() => {
		if (browser) {
			chartInstance = new Chart(chartCanvasInstance, {
				type: 'line',
				data: chartData,
				options: {
					...chartOptions
				},
				plugins: [verticalLinePlugin]
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

<div class={`chart-container w-full relative`} style={styles}>
	<canvas bind:this={chartCanvasInstance}></canvas>
</div>
