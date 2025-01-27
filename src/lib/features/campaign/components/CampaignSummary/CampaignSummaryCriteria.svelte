<script lang="ts">
	import { Table } from '$lib/components';
	import { eligibilityCriteriaColumnDefCommon } from '$lib/features';
	import { type ICampaignSummaryProps } from '$lib/types';

	export let campaign: ICampaignSummaryProps['campaign'];

	$: toggleValue = 'all';

	$: eligibilityCriteriaTable = {
		data: [
			...campaign.criteria.filter((item) => {
				if (toggleValue === 'all') {
					return true;
				}
				if (toggleValue === item.category) {
					return true;
				}
			})
		],
		columnDef: [...eligibilityCriteriaColumnDefCommon]
	};
</script>

<div>
	<Table {...eligibilityCriteriaTable} />
</div>
