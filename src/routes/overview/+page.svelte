<script lang="ts">
	import {
		Card,
		Container,
		LineChartWithControls,
		Metrics,
		SecondaryDoughnutChart,
		Toggle,
		TrendDisplay,
		Typography
	} from '$lib/components';
	import { EChartDateRange, EToggleSizeVariant } from '$lib/types';

	let { data } = $props();

	let sharedTimeRangeValue = $state(EChartDateRange['3m']);
</script>

<div class="flex flex-col w-full gap-8">
	<Metrics>
		{#each data.cards as card}
			<Card label={card.label} classNames="w-full">
				<TrendDisplay
					value={card.data.value}
					change={card.data.change}
					period={card.data.period}
					direction={card.data.direction}
				/>
			</Card>
		{/each}
	</Metrics>

	<Container label="Total Supply" classNames="w-full" variant="secondary">
		{#snippet header()}
			<Typography variant="h6">{data.totalSupply}</Typography>
		{/snippet}
		<div class="flex flex-col lg:flex-row gap-6 w-full pb-4">
			<Container label="Inflation" variant="inner-container">
				<SecondaryDoughnutChart
					chartData={data.inflationChartData}
					centerText={['Inflation', '4.13%']}
					classNames="w-full"
				/>
			</Container>
			<Container label="Supply" variant="inner-container">
				<SecondaryDoughnutChart
					chartData={data.supplyChartData}
					centerText={['Supply', '2.43B']}
					classNames="w-full"
				/>
			</Container>
		</div>
	</Container>
	<Container label="Charts" classNames="w-full" variant="secondary">
		{#snippet header()}
			<Toggle
				options={data.defaultToggleOptions}
				bind:value={sharedTimeRangeValue}
				sizeVariant={EToggleSizeVariant.NORMAL}
			/>
		{/snippet}
		<div class="flex flex-col gap-8">
			<LineChartWithControls
				chartData={data.tvlData.chartData}
				label={data.tvlData.label}
				formatter={data.tvlData.formatter}
				toggleValue={sharedTimeRangeValue}
				displayToggle={false}
			/>
			<div class="grid gap-8 grid-cols-1 lg:grid-cols-2">
				<LineChartWithControls
					chartData={data.stakedData.chartData}
					label={data.stakedData.label}
					formatter={data.stakedData.formatter}
					toggleValue={sharedTimeRangeValue}
					displayToggle={false}
				/>
				<LineChartWithControls
					chartData={data.newAddressesData.chartData}
					label={data.newAddressesData.label}
					formatter={data.newAddressesData.formatter}
					toggleValue={sharedTimeRangeValue}
					displayToggle={false}
				/>
			</div>
		</div>
	</Container>
</div>
