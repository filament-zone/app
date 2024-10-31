<script lang="ts">
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';
	import { campaignStore, delegatesColumnDefCommon } from '$lib/features';
	import { Container, Table } from '$lib/components';
	import type { IDelegate, ITableProps } from '$lib/types';

	const data = derived(page, () => $page.data);
	const { campaignDetails } = campaignStore;

	$: activeDelegatesTable = {
		...$data.step1Data.activeDelegatesTable,
		data: [
			...$data.delegates
				.filter((delegate: IDelegate) => $campaignDetails.activeDelegates.includes(delegate.id))
				.sort((a: IDelegate, b: IDelegate) => Number(b.votingPower) - Number(a.votingPower))
		],
		columnDef: delegatesColumnDefCommon
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;
</script>

<div>
	<Container label="Election of governance">
		<Table {...activeDelegatesTable} />
	</Container>
</div>
