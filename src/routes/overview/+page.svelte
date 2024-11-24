<script>
	import {
		Card,
		LineChartWithControls,
		PrimaryDoughnutChart,
		TrendDisplay,
		Typography
	} from '$lib/components';

	export let data;
</script>

<div class="flex flex-col w-full gap-4">
	<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
	</div>
	<Card label="Total Supply" class="w-full">
		<Typography variant="h6">{data.totalSupply}</Typography>
		<div class="flex flex-col lg:flex-row gap-8 w-full mt-8 pb-4">
			<PrimaryDoughnutChart
				chartData={data.inflationChartData}
				centerText={['Inflation', '4.13%']}
				class="w-full"
			/>
			<PrimaryDoughnutChart
				chartData={data.supplyChartData}
				centerText={['Supply', '2.43B']}
				class="w-full"
			/>
		</div>
	</Card>
	<div class="flex flex-col gap-4">
		<Typography variant="h5">Charts</Typography>
		<LineChartWithControls {...data.tvlData} />
		<div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
			<LineChartWithControls {...data.stakedData} />
			<LineChartWithControls {...data.newAddressesData} />
		</div>
	</div>
</div>
