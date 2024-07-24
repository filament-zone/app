<script context="module" lang="ts">
	import { Chart, registerables } from 'chart.js';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { LineChartWithControls } from '$lib/components';
	import { createSmoothRandomData, generateDateLabels } from '$lib/helpers';
	import { formatLargeNumber } from '$lib/utils';
	import { type ILineChartWithControlsProps } from '$lib/types';

	export const meta = {
		title: 'Organisms/Charts/LineChartWithControls',
		component: LineChartWithControls
	};

	Chart.register(...registerables);

	const labels = generateDateLabels('2015-01-01', '2022-12-31');

	const chartData: ILineChartWithControlsProps['data'] = {
		labels,
		datasets: [
			{
				label: 'Views',
				data: createSmoothRandomData(labels.length, 100000, 120000, 10000)
			}
		]
	};
</script>

<Template let:args>
	<div class="mt-16">
		<LineChartWithControls {...args} />
	</div>
</Template>

<Story
	name="Primary"
	args={{
		chartData,
		label: 'TVL',
		formatter: formatLargeNumber,
		useLastValue: true
	}}
/>
