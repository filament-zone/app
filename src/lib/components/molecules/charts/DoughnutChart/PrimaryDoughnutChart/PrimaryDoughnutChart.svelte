<script lang="ts">
	import type { Chart } from 'chart.js';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import { AbstractDoughnutChart } from '$lib/components';
	import { type IAbstractDoughnutChartProps, type IPrimaryDoughnutChartProps } from '$lib/types';

	let { chartData }: IPrimaryDoughnutChartProps = $props();

	let chartInstance: IAbstractDoughnutChartProps['chartInstance'] = $state();

	const chartOptions: IAbstractDoughnutChartProps['chartOptions'] = {
		cutout: 110,
		plugins: {
			datalabels: {
				clamp: true,
				color: '#000',
				anchor: 'start',
				align: 'center',
				offset: 0,
				borderWidth: 0.5,
				borderColor: 'white',
				borderRadius: 4,
				backgroundColor: (context: { dataset: { backgroundColor: string } }) => {
					return context.dataset.backgroundColor as string;
				},
				font: {
					weight: 'bold'
				},
				formatter: (
					value: number,
					context: {
						chart: Chart;
						dataIndex: number;
					}
				) => {
					const label = context.chart.data.labels?.[context.dataIndex];
					const tempVar = context.chart.data.datasets[0].data.reduce(
						(a, b) => (a as number) + (b as number)
					) as number;
					const percentage = ((value / tempVar) * 100).toFixed(2);
					return `${label}\n${value}M FILA (${percentage}%)`;
				},
				padding: {
					top: 10,
					bottom: 10,
					left: 10,
					right: 10
				}
			}
		}
	};
</script>

<AbstractDoughnutChart {chartData} bind:chartInstance plugins={[ChartDataLabels]} {chartOptions} />
