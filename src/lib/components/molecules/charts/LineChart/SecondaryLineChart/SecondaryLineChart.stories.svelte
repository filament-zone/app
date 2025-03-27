<!--<script module lang="ts">-->
<!--	import { Chart, registerables } from 'chart.js';-->
<!--	import { Story, Template } from '@storybook/addon-svelte-csf';-->
<!--	import { SecondaryLineChart } from '$lib/components';-->
<!--	import { createSmoothRandomData, generateDateLabels } from '$lib/helpers';-->
<!--	import { type ISecondaryLineChartProps } from '$lib/types';-->

<!--	export const meta = {-->
<!--		title: 'Molecules/Charts/LineChart',-->
<!--		component: SecondaryLineChart-->
<!--	};-->

<!--	Chart.register(...registerables);-->

<!--	const labels = generateDateLabels('2022-01-01', '2022-12-31');-->

<!--	const data: ISecondaryLineChartProps['data'] = {-->
<!--		labels,-->
<!--		datasets: [-->
<!--			{-->
<!--				label: 'Views',-->
<!--				data: createSmoothRandomData(labels.length, 100, 120)-->
<!--			}-->
<!--		]-->
<!--	};-->
<!--</script>-->

<!--<Template>-->
<!--	{#snippet children({ args })}-->
<!--		<div class="mt-16">-->
<!--			<SecondaryLineChart {...args} />-->
<!--		</div>-->
<!--	{/snippet}-->
<!--</Template>-->

<!--<Story name="Secondary" args={{ data, styles: 'height: 400px', label: 'TVL' }} />-->
