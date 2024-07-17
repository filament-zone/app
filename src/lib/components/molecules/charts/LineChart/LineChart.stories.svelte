<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { LineChart } from '$lib/components';
	import { type ILineChartProps } from '$lib/types';
	import { createSmoothRandomData, generateDateLabels } from '$lib/helpers';

	export const meta = {
		title: 'Molecules/Charts/LineChart',
		component: LineChart
	};

	const data: ILineChartProps['data'] = {
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
	<div class="flex w-full h-full justify-center align-middle">
		<div class="w-full">
			<LineChart {...args} />
		</div>
	</div>
</Template>

<Story name="Primary" args={{ data, styles: 'height: 400px' }} />
