<script context="module" lang="ts">
	import { Chart, registerables } from 'chart.js';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { PrimaryLineChart } from '$lib/components';
	import { createSmoothRandomData, generateDateLabels } from '$lib/helpers';
	import { type IPrimaryLineChartProps } from '$lib/types';

	export const meta = {
		title: 'Molecules/Charts/LineChart',
		component: PrimaryLineChart
	};

	Chart.register(...registerables);

	const data: IPrimaryLineChartProps['data'] = {
		labels: generateDateLabels('2022-10-01', '2022-12-31'),
		datasets: [
			{
				label: 'Views',
				data: createSmoothRandomData(90, 80, 120)
			},
			{
				label: 'Clicks',
				data: createSmoothRandomData(90, 50, 80)
			},
			{
				label: 'Conversions',
				data: createSmoothRandomData(90, 5, 50)
			}
		]
	};
</script>

<Template let:args>
	<div class="mt-16">
		<PrimaryLineChart {...args} />
	</div>
</Template>

<Story name="Primary" args={{ data, styles: 'height: 400px' }} />
