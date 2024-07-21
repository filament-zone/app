<script lang="ts">
	import { Chart } from 'chart.js';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import { AbstractDoughnutChart } from '$lib/components';
	import { type IAbstractDoughnutChartProps, type IPrimaryDoughnutChartProps } from '$lib/types';

	export let chartData: IPrimaryDoughnutChartProps['chartData'];
	export let centerText: string[];

	let chartInstance: IPrimaryDoughnutChartProps['chartInstance'];

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
				backgroundColor: (context) => {
					return context.dataset.backgroundColor as string;
				},
				font: {
					weight: 'bold'
				},
				formatter: (value, context) => {
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

	$: centerTextPlugin = {
		id: 'centerTextPlugin',
		afterDraw: (chart: Chart<'pie'>) => {
			const ctx = chart.ctx;
			const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
			const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

			ctx.save();

			ctx.font = `bold 16px "ff-meta-serif-web-pro", serif`;
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';
			ctx.fillStyle = 'white';

			const firstLine = centerText[0];
			ctx.fillText(firstLine, centerX, centerY - 10);

			ctx.font = `normal 14px "ff-meta-serif-web-pro", serif`;

			const secondLine = centerText[1];
			ctx.fillText(secondLine, centerX, centerY + 10);

			ctx.restore();
		}
	};
</script>

<AbstractDoughnutChart
	{chartData}
	bind:chartInstance
	plugins={[ChartDataLabels, centerTextPlugin]}
	{chartOptions}
	{...$$props}
/>
