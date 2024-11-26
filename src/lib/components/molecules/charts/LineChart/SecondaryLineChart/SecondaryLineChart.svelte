<script lang="ts">
	import { AbstractLineChart } from '$lib/components';
	import { externalTooltipHandler } from '../tooltips';
	import { verticalLinePlugin } from '../plugins';
	import {
		type ChartInstance,
		type IAbstractBarChartProps,
		type ISecondaryLineChartProps
	} from '$lib/types';

	export let data: ISecondaryLineChartProps['data'];
	export let lineColors: ISecondaryLineChartProps['lineColors'] = ['#A8FFCE'];
	export let backgroundColors: ISecondaryLineChartProps['backgroundColors'] = [
		'rgba(168, 255, 206, 0.1)'
	];

	let chartCanvasInstance: IAbstractBarChartProps['chartCanvasInstance'];
	let chartInstance: IAbstractBarChartProps['chartInstance'];

	$: chartData = {
		labels: data?.labels?.length ? [...(data?.labels as string[])] : [],
		datasets:
			data?.datasets?.map((dataset, index) => {
				return {
					label: dataset.label,
					data: [...dataset.data],
					pointRadius: 0,
					borderColor: lineColors[index],
					tension: 0.4,
					borderWidth: 2,
					backgroundColor: backgroundColors[index],
					fill: true
				};
			}) ?? []
	};

	$: chartOptions = {
		scales: {
			y: {
				display: true,
				beginAtZero: false,

				ticks: {
					color: '#9E9E9E',
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
					color: '#7C7C7C',
					drawBorder: false,
					borderWidth: 0.4,
					drawTicks: false,
					borderDash: [5, 5]
				},
				suggestedMax: Math.max(...(data.datasets?.[0].data as number[])) * 1.05,
				suggestedMin: Math.min(...(data.datasets?.[0].data as number[])) * 0.95
			},
			x: {
				display: false
			},
			x2: {
				offset: true,
				position: 'bottom',
				ticks: {
					font: {
						size: 14,
						weight: 500
					},
					autoSkip: true,
					autoSkipPadding: 10,
					maxRotation: 0,
					minRotation: 0,
					padding: 20,
					align: 'center'
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
		layout: {
			padding: {
				right: 20
			}
		}
	} as ChartInstance<'line'>['options'];
</script>

<AbstractLineChart
	bind:chartInstance
	bind:chartCanvasInstance
	{chartData}
	{chartOptions}
	styles={`height: 285px;`}
	plugins={[verticalLinePlugin]}
/>
