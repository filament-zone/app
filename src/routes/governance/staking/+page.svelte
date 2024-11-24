<script lang="ts">
	import { Card, Table, Typography } from '$lib/components';

	export let data;
</script>

<div class="flex flex-col w-full gap-8">
	<div class="flex flex-col md:flex-row gap-8">
		{#each data.cards as card}
			<Card label={card.label} class="w-full">
				<Typography variant="h6">{card.data}</Typography>
			</Card>
		{/each}
	</div>
	<Table {...data.tableDelegationsData} />
	<Table {...data.tableAllValidatorsData} />
</div>
