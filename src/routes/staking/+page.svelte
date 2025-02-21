<script lang="ts">
	import { SvelteComponent } from 'svelte';
	import { Card, Container, Metrics, Table, Typography } from '$lib/components';

	let { data } = $props();

	const RightLabelDelegations = data.tableDelegationsData
		.tableRightLabel as unknown as typeof SvelteComponent;
	const RightLabelValidators = data.tableAllValidatorsData
		.tableRightLabel as unknown as typeof SvelteComponent;
</script>

<div class="flex flex-col w-full gap-8">
	<Metrics>
		{#each data.cards as card}
			<Card label={card.label} class="w-full">
				<Typography variant="h6">{card.data}</Typography>
			</Card>
		{/each}
	</Metrics>
	<Container lael={data.tableDelegationsData.tableLabel}>
		{#snippet header()}
			<RightLabelDelegations />
		{/snippet}
		{#snippet mainSlot()}
			<Table {...{ ...data.tableDelegationsData, tableLabel: '', tableRightLabel: null }} />
		{/snippet}
	</Container>

	<Container label={data.tableAllValidatorsData.tableLabel}>
		{#snippet header()}
			<RightLabelValidators />
		{/snippet}
		<Table {...{ ...data.tableAllValidatorsData, tableLabel: '', tableRightLabel: null }} />
	</Container>
</div>
