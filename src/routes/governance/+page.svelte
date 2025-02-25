<script lang="ts">
	import { Card, Container, Metrics, Table, Typography } from '$lib/components';

	let { data } = $props();
</script>

<div class="flex flex-col w-full gap-8">
	<Metrics>
		{#snippet mainSlot()}
			{#each data.cards as card}
				<Card label={card.label} class="w-full">
					<Typography variant="h6">{card.data}</Typography>
				</Card>
			{/each}
		{/snippet}
	</Metrics>
	<Container label={data.tableLiveProposalsData.tableLabel}>
		{#snippet header()}
			<data.tableLiveProposalsData.tableRightLabel />
		{/snippet}
		<Table {...{ ...data.tableLiveProposalsData, tableLabel: '', tableRightLabel: null }} />
	</Container>
</div>
