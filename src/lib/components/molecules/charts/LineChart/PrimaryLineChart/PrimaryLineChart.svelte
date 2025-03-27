<script lang="ts">
	import { AbstractLineChart } from '$lib/components';
	import { externalTooltipHandler } from '../tooltips';
	import { verticalLinePlugin } from '../plugins';
	import {
		type ChartInstance,
		type IAbstractBarChartProps,
		type IPrimaryLineChartProps
	} from '$lib/types';

	let { data }: IPrimaryLineChartProps = $props();

	let chartCanvasInstance: IAbstractBarChartProps['chartCanvasInstance'] | undefined = $state();
	let chartInstance: IAbstractBarChartProps['chartInstance'] | undefined = $state();

	let x2Labels = $derived(data?.labels?.map((label) => label));

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

	let chartOptions = $derived({
		scales: {
			y: {
				display: true,
				beginAtZero: true,
				min: 0,
				type: 'logarithmic',
				ticks: {
					font: {
						size: 14,
						weight: 500
					},
					maxRotation: 0,
					autoSkip: true,
					autoSkipPadding: 20,
					padding: 10
				},
				grid: {
					color: '#7c7c7c',
					drawBorder: true,
					borderWidth: 0.4,
					drawTicks: false,
					borderDash: [5, 5]
				}
			},
			x: {
				display: false,
				grid: {
					color: '#7c7c7c',
					borderWidth: 0,
					display: false,
					drawBorder: false
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
		}
	} as ChartInstance<'line'>['options']);
</script>

<AbstractLineChart
	bind:chartInstance
	bind:chartCanvasInstance
	{chartData}
	{chartOptions}
	styles={`height: 285px;`}
	plugins={[verticalLinePlugin]}
/>
