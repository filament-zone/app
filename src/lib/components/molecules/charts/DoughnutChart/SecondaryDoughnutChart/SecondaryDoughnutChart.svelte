<script lang="ts">
	import {
		AbstractDoughnutChart,
		createCenterTextPlugin,
		createLabelLinePlugin
	} from '$lib/components';
	import { type IAbstractDoughnutChartProps, type IPrimaryDoughnutChartProps } from '$lib/types';

	export let chartData: IPrimaryDoughnutChartProps['chartData'];
	export let centerText: string[] | undefined;

	let chartInstance: IPrimaryDoughnutChartProps['chartInstance'];

	const chartOptions: IAbstractDoughnutChartProps['chartOptions'] = {
		cutout: 120,
		radius: '50%',
		hover: {
			mode: 'nearest'
		},
		elements: {
			arc: {
				hoverOffset: 10,
				borderWidth: 2,
				hoverBorderWidth: 4,
				borderColor: '#181818',
				hoverBorderColor: 'white'
			}
		}
	};

	const centerTextPlugin = createCenterTextPlugin(centerText);
	const labelLinePlugin = createLabelLinePlugin(5, 5);
</script>

<AbstractDoughnutChart
	{chartData}
	bind:chartInstance
	plugins={[centerTextPlugin, labelLinePlugin]}
	{chartOptions}
	{...$$props}
/>
