<script module lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { SliderBarChart } from '$lib/components';
	import type { IPrimaryBarChartProps } from '$lib/types';
	import { sliderBarChartDataMock } from './mock';

	const data: IPrimaryBarChartProps['data'] = {
		labels: Array.from({ length: 31 }, () => ''),
		datasets: [
			{
				data: sliderBarChartDataMock()
			}
		]
	};

	export const meta = {
		title: 'Molecules/Charts/BarChart',
		component: SliderBarChart
	};
</script>

<Template >
	{#snippet children({ args })}
		<div class="w-full">
			<SliderBarChart {...args} />
		</div>
	{/snippet}
</Template>

<Story name="Slider" args={{ data }} />
