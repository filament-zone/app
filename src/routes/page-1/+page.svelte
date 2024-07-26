<script>
	import { Card, Table, TrendDisplay } from '$lib/components';

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
	<Table {...data.tableData} />
</div>
