<script lang="ts">
	import { delegatesColumnDefCommonSecond } from '$lib/features';
	import { Table } from '$lib/components';
	import { shortCutTransactionHash } from '$lib/helpers';
	import type { ICampaign, ITableProps } from '$lib/types';

	export let campaign: ICampaign;

	const sumVotingPower = Object.values(campaign.delegates).reduce(
		(acc, curr) => Number(acc) + Number(curr),
		0
	);

	$: activeDelegatesTable = {
		data: [
			...Object.entries(campaign.delegates).map(([key, value]) => {
				return {
					address: shortCutTransactionHash(key),
					percentage: Number(value) / sumVotingPower,
					votingPower: value
				};
			})
		],
		columnDef: delegatesColumnDefCommonSecond
	} as Pick<ITableProps, 'columnDef' | 'data' | 'tableLabel'>;
</script>

<Table {...activeDelegatesTable} />
