<script lang="ts">
	import { AbstractLineChart } from '$lib/components';
	import {
		type ChartInstance,
		type IAbstractBarChartProps,
		type IPlainLineChartProps
	} from '$lib/types';
	import { calculatePercentageChange } from '$lib/helpers';

	interface Props {
		data: IPlainLineChartProps['data'];
		styles?: IPlainLineChartProps['styles'];
	}

	let { data, styles = 'height: 285px' }: Props = $props();

	let chartCanvasInstance: IAbstractBarChartProps['chartCanvasInstance'] = $state();
	let chartInstance: IAbstractBarChartProps['chartInstance'] = $state();

	let change = $derived(calculatePercentageChange(data?.datasets[0].data as number[]));
	let lineColors = $derived(change > 0 ? ['#7dFA79'] : ['#ff74a4']);

	let chartData = $derived({
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
	});

	let chartOptions = $derived({
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
	} as ChartInstance<'line'>['options']);
</script>

<AbstractLineChart
	bind:chartInstance
	bind:chartCanvasInstance
	{chartData}
	{chartOptions}
	styles={`${styles}`}
/>
