<script context="module" lang="ts">
	import { Chart, registerables } from 'chart.js';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { PlainLineChart } from '$lib/components';
	import { createSmoothRandomData, generateDateLabels } from '$lib/helpers';
	import { type ISecondaryLineChartProps } from '$lib/types';

	export const meta = {
		title: 'Molecules/Charts/LineChart/Plain',
		component: PlainLineChart
	};

	Chart.register(...registerables);

	const labels = generateDateLabels('2022-01-01', '2022-12-31');

	const data: ISecondaryLineChartProps['data'] = {
		labels,
		datasets: [
			{
				data: createSmoothRandomData(labels.length, 100, 120)
			}
		]
	};
</script>

<Template let:args>
	<div class="mt-16">
		<PlainLineChart {...args} />
	</div>
</Template>

<Story name="Plain" args={{ data }} />
