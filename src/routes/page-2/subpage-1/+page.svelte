<script>
	import { Typography, Card, PrimaryDoughnutChart } from '$lib/components';

	export let data;
</script>

<div class="flex flex-col w-full gap-4">
	<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
		{#each data.cards as card}
			<Card label={card.label} class="w-full">
				<Typography variant="h6">{card.data.value}</Typography>
				<Typography variant="body2" color={`${card.data.direction === 'up' ? 'green' : 'red'}`}>
					{card.data.change}
					{card.data.period}
				</Typography>
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
</div>
