<script>
	import {
		Card,
		LineChartWithControls,
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
		<div class="flex flex-col">
			<Typography variant="h5">Charts</Typography>
			<Typography variant="h6">Shared Time Range</Typography>
			<Toggle
				options={data.defaultToggleOptions}
				bind:value={sharedTimeRangeValue}
				sizeVariant={EToggleSizeVariant.NORMAL}
			/>
		</div>
		<LineChartWithControls {...{ ...data.tvlData, toggleValue: sharedTimeRangeValue }} />
		<div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
			<LineChartWithControls {...{ ...data.stakedData, toggleValue: sharedTimeRangeValue }} />
			<LineChartWithControls {...{ ...data.newAddressesData, toggleValue: sharedTimeRangeValue }} />
		</div>
	</div>
</div>
