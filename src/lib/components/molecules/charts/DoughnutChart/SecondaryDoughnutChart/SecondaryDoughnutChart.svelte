<script lang="ts">
	import {
		AbstractDoughnutChart,
		createCenterTextPlugin,
		createLabelLinePlugin
	} from '$lib/components';
	import {
		type IAbstractBarChartProps,
		type IAbstractDoughnutChartProps,
		type ISecondaryDoughnutChartProps
	} from '$lib/types';

	let { chartData, centerText, classNames }: ISecondaryDoughnutChartProps = $props();

	let chartCanvasInstance: IAbstractBarChartProps['chartCanvasInstance'] | undefined = $state();
	let chartInstance: IAbstractBarChartProps['chartInstance'] | undefined = $state();

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

	const centerTextPlugin = $derived.by(() => createCenterTextPlugin(centerText));
	const labelLinePlugin = $derived.by(() => createLabelLinePlugin(5, 5));
</script>

<AbstractDoughnutChart
	{chartData}
	bind:chartInstance
	bind:chartCanvasInstance
	plugins={[centerTextPlugin, labelLinePlugin]}
	{chartOptions}
	{classNames}
/>
