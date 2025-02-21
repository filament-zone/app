<script module lang="ts">
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

<Template >
	{#snippet children({ args })}
		<div class="w-full">
			<PrimaryBarChart {...args} />
		</div>
	{/snippet}
</Template>

<Story name="Primary" args={{ data }} />
