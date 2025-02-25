<script lang="ts">
	import { AbstractBarChart } from '$lib/components';
	import { screenDetect } from '$lib/helpers';
	import { chartStylesConfig } from './PrimaryBarChartStylesConfig';
	import {
		type ChartInstance,
		type IAbstractBarChartProps,
		type IPrimaryBarChartProps
	} from '$lib/types';

	interface Props {
		data: IPrimaryBarChartProps['data'];
	}

	let { data }: Props = $props();

	let chartCanvasInstance: IAbstractBarChartProps['chartCanvasInstance'] = $state();
	let chartInstance: IAbstractBarChartProps['chartInstance'] = $state();

	const screenTypeStore = screenDetect();
	let currentScreen = $derived($screenTypeStore.currentScreen);

	const firstDayIndices = data?.labels
		?.map((label, index) => {
			if (index === 0 || label === '01') {
				return index;
			}
			return null;
		})
		.filter((index): index is number => index !== null);

	let x2Labels = $state(new Array(data?.labels?.length).fill(''));

	if (firstDayIndices?.length) {
		x2Labels[firstDayIndices[0]] = 'Oct';
		x2Labels[firstDayIndices[1]] = 'Nov';
	}

	const localData = {
		labels: data.labels,
		datasets: [
			{
				type: 'line',
				data: data.datasets[0].data,
				borderColor: data.datasets[0].borderColor ?? '#87FFFF',
				borderWidth: 4,
				pointRadius: 0,
				fill: false
			},
			{
				type: 'line',
				data: data.datasets[1].data,
				borderColor: data.datasets[0].borderColor ?? '#ff679b',
				borderWidth: 4,
				pointRadius: 0,
				fill: false
			},
			{
				data: data.datasets[2].data,
				backgroundColor: data.datasets[0].backgroundColor ?? '#144A94',
				borderWidth: 0
			}
		]
	} as ChartInstance['data'];

	let chartOptions = $derived({
		scales: {
			y: {
				display: false
			},
			x: {
				grid: {
					display: false
				},
				border: {
					color: '#144A94',
					width: 4
				},
				ticks: {
					color: '#144A94',
					font: {
						size: chartStylesConfig[currentScreen]['x']['fontSize'],
						weight: 500
					},
					maxRotation: 0
				},
				max: chartStylesConfig[currentScreen]['max']
			},
			x2: {
				offset: true,
				position: 'bottom',
				labels: x2Labels,
				border: {
					display: false
				},
				grid: {
					drawOnChartArea: false,
					drawTicks: false
				},
				ticks: {
					color: '#144A94',
					font: {
						size: chartStylesConfig[currentScreen]['x2']['fontSize'],
						weight: 500
					},
					maxRotation: 0
				},
				max: chartStylesConfig[currentScreen]['max']
			}
		},

		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				enabled: false
			}
		}
	});

	let chartHeight = $derived(chartStylesConfig[currentScreen]['chartHeight']);
</script>

<div class="relative mt-[125px]">
	<AbstractBarChart
		bind:chartInstance
		bind:chartCanvasInstance
		chartData={localData}
		{chartOptions}
		className={`absolute`}
		styles={`height: ${chartHeight}px;`}
	/>
</div>
