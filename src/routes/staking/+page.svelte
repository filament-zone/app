<script lang="ts">
	import { type Component } from 'svelte';
	import { Card, Container, Metrics, Table, Typography } from '$lib/components';

	let { data } = $props();

	const RightLabelDelegations = data.tableDelegationsData.tableRightLabel as Component;
	const RightLabelValidators = data.tableAllValidatorsData.tableRightLabel as Component;
</script>

<div class="flex flex-col w-full gap-8">
	<Metrics>
		{#each data.cards as card}
			<Card label={card.label} classNames="w-full">
				<Typography variant="h6">{card.data}</Typography>
			</Card>
		{/each}
	</Metrics>
	<Container label={data.tableDelegationsData.tableLabel}>
		{#snippet header()}
			<RightLabelDelegations />
		{/snippet}
		<Table {...{ ...data.tableDelegationsData, tableLabel: '', tableRightLabel: null }} />
	</Container>

	<Container label={data.tableAllValidatorsData.tableLabel}>
		{#snippet header()}
			<RightLabelValidators />
		{/snippet}
		<Table {...{ ...data.tableAllValidatorsData, tableLabel: '', tableRightLabel: null }} />
	</Container>
</div>
