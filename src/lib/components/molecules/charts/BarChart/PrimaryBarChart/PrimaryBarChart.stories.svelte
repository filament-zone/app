<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { PrimaryBarChart } from '$lib/components';
	import { primaryChartLabelsMock, primaryChartDataMock } from './mock';
	import { type IPrimaryBarChartProps } from '$lib/types';

	const data: IPrimaryBarChartProps['data'] = {
		labels: primaryChartLabelsMock,
		datasets: [
			{
				data: primaryChartDataMock()
			},
			{
				data: primaryChartDataMock()
			},
			{
				data: primaryChartDataMock()
			}
		]
	};

	export const meta = {
		title: 'Molecules/Charts/BarChart',
		component: PrimaryBarChart
	};
</script>

<Template let:args>
	<div class="w-full">
		<PrimaryBarChart {...args} />
	</div>
</Template>

<Story name="Primary" args={{ data }} />
