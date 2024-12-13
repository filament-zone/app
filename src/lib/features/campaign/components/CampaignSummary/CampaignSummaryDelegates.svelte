<script lang="ts">
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';
	import { delegatesColumnDefCommon } from '$lib/features';
	import { Table } from '$lib/components';
	import type { IDelegate, ITableProps, ICampaignSummaryProps } from '$lib/types';

	export let campaign: ICampaignSummaryProps['campaign'];

	const data = derived(page, () => $page.data);
	console.log('CAMPAIGN SUMMARY DELEGATES DATA:', $data);
	$: activeDelegatesTable = {
		data: [
			...$data.pageData.delegates.filter((delegate: IDelegate) =>
				campaign.evictions?.includes(delegate.id)
			)
		],
		columnDef: delegatesColumnDefCommon
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;
</script>

<Table {...activeDelegatesTable} />
