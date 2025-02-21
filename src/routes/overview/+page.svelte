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
		{#snippet header()}
			<Typography variant="h6">{data.totalSupply}</Typography>
		{/snippet}
		{#snippet mainSlot()}
			<div class="flex flex-col lg:flex-row gap-6 w-full pb-4">
				<Container label="Inflation" variant="inner-container">
					{#snippet mainSlot()}
						<SecondaryDoughnutChart
							chartData={data.inflationChartData}
							centerText={['Inflation', '4.13%']}
							class="w-full"
						/>
					{/snippet}
				</Container>
				<Container label="Supply" variant="inner-container">
					{#snippet mainSlot()}
						<SecondaryDoughnutChart
							chartData={data.supplyChartData}
							centerText={['Supply', '2.43B']}
							class="w-full"
						/>
					{/snippet}
				</Container>
			</div>
		{/snippet}
	</Container>
	<Container label="Charts" class="w-full" variant="secondary">
		{#snippet header()}
			<Toggle
				options={data.defaultToggleOptions}
				bind:value={sharedTimeRangeValue}
				sizeVariant={EToggleSizeVariant.NORMAL}
			/>
		{/snippet}
		{#snippet mainSlot()}
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
						{...{
							...data.newAddressesData,
							toggleValue: sharedTimeRangeValue,
							displayToggle: false
						}}
					/>
				</div>
			</div>
		{/snippet}
	</Container>
</div>
