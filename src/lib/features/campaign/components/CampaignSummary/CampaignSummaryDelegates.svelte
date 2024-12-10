<script lang="ts">
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';
	import { delegatesColumnDefCommon } from '$lib/features';
	import { Table } from '$lib/components';
	import type { IDelegate, ITableProps, ICampaignSummaryProps } from '$lib/types';

	export let campaign: ICampaignSummaryProps['campaign'];

	const data = derived(page, () => $page.data);

	$: activeDelegatesTable = {
		data: [
			...$data.delegates
				.filter((delegate: IDelegate) => campaign.activeDelegates.includes(delegate.id))
				.sort((a: IDelegate, b: IDelegate) => Number(b.votingPower) - Number(a.votingPower))
		],
		columnDef: delegatesColumnDefCommon
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;
</script>

<Table {...activeDelegatesTable} />
