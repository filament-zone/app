<script lang="ts">
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';
	import { campaignStore, delegatesColumnDefCommon } from '$lib/features';
	import { Container, Table } from '$lib/components';
	import type { IDelegate, ITableProps } from '$lib/types';

	const data = derived(page, () => $page.data);
	const { campaignDetails } = campaignStore;

	$: selectedActiveDelegatesIds = $campaignDetails.selectedActiveDelegates;
	$: evictedActiveDelegatesIds = $campaignDetails.selectedEvictedDelegates;

	$: activeDelegatesTable = {
		...$data.step1Data.activeDelegatesTable,
		data: [
			...$data.step1Data.activeDelegatesTable.data.filter((activeDelegate: IDelegate) =>
				selectedActiveDelegatesIds.includes(activeDelegate.id)
			)
		],
		columnDef: delegatesColumnDefCommon
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;

	$: evictedDelegatesTable = {
		...$data.step1Data.evictedDelegatesTable,
		data: [
			...$data.step1Data.evictedDelegatesTable.data.filter((evictedDelegate: IDelegate) =>
				evictedActiveDelegatesIds.includes(evictedDelegate.id)
			)
		],
		columnDef: delegatesColumnDefCommon
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;
</script>

<div>
	<Container label="Election of delegates">
		<Table {...activeDelegatesTable} />
		<Table {...evictedDelegatesTable} />
	</Container>
</div>
