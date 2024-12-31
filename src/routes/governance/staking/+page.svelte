<script lang="ts">
	import { Card, Container, Metrics, Table, Typography } from '$lib/components';

	export let data;
</script>

<div class="flex flex-col w-full gap-8">
	<Metrics>
		{#each data.cards as card}
			<Card label={card.label} class="w-full">
				<Typography variant="h6">{card.data}</Typography>
			</Card>
		{/each}
	</Metrics>
	<Container label={data.tableDelegationsData.tableLabel}>
		<svelte:component this={data.tableDelegationsData.tableRightLabel} slot="header" />
		<Table {...{ ...data.tableDelegationsData, tableLabel: '', tableRightLabel: null }} />
	</Container>

	<Container label={data.tableAllValidatorsData.tableLabel}>
		<svelte:component this={data.tableAllValidatorsData.tableRightLabel} slot="header" />
		<Table {...{ ...data.tableAllValidatorsData, tableLabel: '', tableRightLabel: null }} />
	</Container>
</div>
