<script lang="ts">
	import { AbstractLineChart } from '$lib/components';
	import {
		type ChartInstance,
		type IAbstractBarChartProps,
		type IPlainLineChartProps
	} from '$lib/types';
	import { calculatePercentageChange } from '$lib/helpers';

	export let data: IPlainLineChartProps['data'];
	export let styles: IPlainLineChartProps['styles'] = 'height: 285px';

	let chartCanvasInstance: IAbstractBarChartProps['chartCanvasInstance'];
	let chartInstance: IAbstractBarChartProps['chartInstance'];

	$: change = calculatePercentageChange(data?.datasets[0].data as number[]);
	$: lineColors = change > 0 ? ['#00C48C'] : ['#FF5C5C'];

	$: chartData = {
		labels: data?.labels?.length ? [...(data?.labels as string[])] : [],
		datasets:
			data?.datasets?.map((dataset, index) => {
				return {
					label: dataset.label,
					data: [...dataset.data],
					pointRadius: 0,
					borderColor: lineColors[index],
					tension: 0.4
				};
			}) ?? []
	};

	$: chartOptions = {
		scales: {
			y: {
				display: false,
				suggestedMax: Math.max(...(data.datasets?.[0].data as number[])) * 1.05,
				suggestedMin: Math.min(...(data.datasets?.[0].data as number[])) * 0.95
			},
			x: {
				display: false
			},
			x2: {
				display: false
			}
		},

		plugins: {
			legend: {
				display: false
			}
		}
	} as ChartInstance<'line'>['options'];
</script>

<AbstractLineChart
	bind:chartInstance
	bind:chartCanvasInstance
	{chartData}
	{chartOptions}
	styles={`${styles}`}
/>
