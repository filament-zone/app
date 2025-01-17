<script>
	import {
		Card,
		Container,
		LineChartWithControls,
		Metrics,
		PrimaryDoughnutChart,
		Toggle,
		TrendDisplay,
		Typography
	} from '$lib/components';
	import { EChartDateRange, EToggleSizeVariant } from '$lib/types';

	export let data;

	let sharedTimeRangeValue = EChartDateRange['3m'];
</script>

<div class="flex flex-col w-full gap-4">
	<Metrics>
		{#each data.cards as card}
			<Card label={card.label} class="w-full">
				<TrendDisplay
					value={card.data.value}
					change={card.data.change}
					period={card.data.period}
					direction={card.data.direction}
				/>
			</Card>
		{/each}
	</Metrics>

	<Container label="Total Supply" class="w-full" variant="secondary">
		<Typography variant="h6" slot="header">{data.totalSupply}</Typography>
		<div class="flex flex-col lg:flex-row gap-6 w-full pb-4">
			<Container label="Inflation" variant="inner-container">
				<PrimaryDoughnutChart
					chartData={data.inflationChartData}
					centerText={['Inflation', '4.13%']}
					class="w-full"
				/>
			</Container>
			<Container label="Supply" variant="inner-container">
				<PrimaryDoughnutChart
					chartData={data.supplyChartData}
					centerText={['Supply', '2.43B']}
					class="w-full"
				/>
			</Container>
		</div>
	</Container>
	<Container label="Charts" class="w-full" variant="secondary">
		<Toggle
			options={data.defaultToggleOptions}
			bind:value={sharedTimeRangeValue}
			sizeVariant={EToggleSizeVariant.NORMAL}
			slot="header"
		/>
		<div class="flex flex-col gap-8">
			<LineChartWithControls
				{...{
					...data.tvlData,
					toggleValue: sharedTimeRangeValue,
					displayToggle: false
				}}
			/>
			<div class="grid gap-8 grid-cols-1 lg:grid-cols-2">
				<LineChartWithControls
					{...{
						...data.stakedData,
						toggleValue: sharedTimeRangeValue,
						displayToggle: false
					}}
				/>
				<LineChartWithControls
					{...{ ...data.newAddressesData, toggleValue: sharedTimeRangeValue, displayToggle: false }}
				/>
			</div>
		</div>
	</Container>
</div>
