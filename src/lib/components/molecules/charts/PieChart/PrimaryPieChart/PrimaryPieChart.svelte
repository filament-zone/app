<script lang="ts">
	import { Chart } from 'chart.js';
	import { AbstractPieChart } from '$lib/components';
	import { screenDetect } from '$lib/helpers';
	import type { IPrimaryPieChartProps } from '$lib/types';

	interface Props {
		data: IPrimaryPieChartProps['data'];
		colors?: IPrimaryPieChartProps['colors'];
	}

	let { data, colors = ['#fff', '#144a94'] }: Props = $props();

	let chartInstance: IPrimaryPieChartProps['chartInstance'] = $state();

	const screenTypeStore = screenDetect();
	let currentScreen = $derived($screenTypeStore.currentScreen);

	const chartData = {
		labels: data?.map(({ label }) => label) ?? [],
		datasets: [
			{
				data: data?.map(({ value }) => value),
				backgroundColor: colors,
				borderRadius: 4,
				borderWidth: 2
			}
		]
	};

	const centerTextConfig: (
		width: number,
		height: number
	) => Record<string, Record<string, number>> = (width, height) => ({
		xs: {
			fontSize: 52,
			textX: width * 0.64,
			textY: height * 0.7
		},
		sm: {
			fontSize: 62,
			textX: width * 0.65,
			textY: height * 0.7
		},
		md: {
			fontSize: 93,
			textX: width * 0.65,
			textY: height * 0.7
		},
		lg: {
			fontSize: 116,
			textX: width * 0.65,
			textY: height * 0.7
		},
		xl: {
			fontSize: 116,
			textX: width * 0.615,
			textY: height * 0.6
		},
		'2xl': {
			fontSize: 116,
			textX: width * 0.625,
			textY: height * 0.6
		},
		'3xl': {
			fontSize: 116,
			textX: width * 0.59,
			textY: height * 0.6
		}
	});

	let centerTextPlugin = $derived({
		id: 'centerTextPlugin',
		afterDraw: (chart: Chart<'pie'>) => {
			const ctx = chart.ctx;
			const config = centerTextConfig(chart.width, chart.height)[currentScreen];
			ctx.save();
			const fontSize = config.fontSize;
			ctx.font = `900 ${fontSize}px "ff-meta-serif-web-pro", serif`;
			ctx.textBaseline = 'middle';
			ctx.textAlign = 'center';

			const text = `${data[1].value}%`;
			const textX = config.textX;
			const textY = config.textY;

			ctx.fillStyle = '#FF679B';
			ctx.fillText(text, textX, textY);
			ctx.restore();
		}
	});
</script>

<AbstractPieChart {chartData} bind:chartInstance plugins={[centerTextPlugin]} />
