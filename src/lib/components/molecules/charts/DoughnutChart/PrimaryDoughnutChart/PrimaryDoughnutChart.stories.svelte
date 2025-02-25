<script module lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { PrimaryDoughnutChart } from '$lib/components';
	import { type IPrimaryDoughnutChartProps } from '$lib/types';

	export const meta = {
		title: 'Molecules/Charts/DoughnutChart',
		component: PrimaryDoughnutChart
	};

	const chartData: IPrimaryDoughnutChartProps['chartData'] = {
		labels: ['Bonded', 'Unbonded'],
		datasets: [
			{
				data: [40.35, 70.12]
			}
		]
	};
</script>

<Template >
	{#snippet children({ args })}
		<div class="flex w-full h-full justify-center align-middle">
			<div class="w-[600px] h-[600px]">
				<PrimaryDoughnutChart {...args} />
			</div>
		</div>
	{/snippet}
</Template>

<Story
	name="Primary"
	args={{
		chartData,
		centerText: ['Inflation', '4.13%']
	}}
/>
