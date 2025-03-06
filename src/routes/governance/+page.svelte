<script lang="ts">
	import { type SvelteComponent } from 'svelte';
	import { Card, Container, Metrics, Table, Typography } from '$lib/components';

	let { data } = $props();

	const RightLabel =
		typeof data.tableLiveProposalsData.tableRightLabel === 'function'
			? (data.tableLiveProposalsData.tableRightLabel as unknown as typeof SvelteComponent)
			: null;
</script>

<div class="flex flex-col w-full gap-8">
	<Metrics>
		{#each data.cards as card}
			<Card label={card.label} classNames="w-full">
				<Typography variant="h6">{card.data}</Typography>
			</Card>
		{/each}
	</Metrics>
	<Container label={data.tableLiveProposalsData.tableLabel}>
		{#snippet header()}
			{#if typeof data.tableLiveProposalsData.tableRightLabel === 'function'}
				<RightLabel {...data.tableLiveProposalsData.tableRightLabelProps} />
			{/if}
		{/snippet}
		<Table {...{ ...data.tableLiveProposalsData, tableLabel: '', tableRightLabel: null }} />
	</Container>
</div>
