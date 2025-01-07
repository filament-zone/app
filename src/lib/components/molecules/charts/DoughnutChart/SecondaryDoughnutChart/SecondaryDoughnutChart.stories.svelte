<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { SecondaryDoughnutChart } from '$lib/components';
	import { type ISecondaryDoughnutChartProps } from '$lib/types';

	export const meta = {
		title: 'Molecules/Charts/DoughnutChart',
		component: SecondaryDoughnutChart
	};

	const chartData: ISecondaryDoughnutChartProps['chartData'] = {
		labels: ['Bonded', 'Unbonded'],
		datasets: [
			{
				data: [40.35, 70.12, 22.33],
				backgroundColor: ['#FF74A4', '#7DFA97', '#B7ABFC']
			}
		]
	};
</script>

<Template let:args>
	<div class="flex w-full h-full justify-center align-middle">
		<div class="w-[600px] h-[600px]">
			<SecondaryDoughnutChart {...args} />
		</div>
	</div>
</Template>

<Story
	name="Secondary"
	args={{
		chartData,
		centerText: ['Inflation', '4.13%']
	}}
/>
