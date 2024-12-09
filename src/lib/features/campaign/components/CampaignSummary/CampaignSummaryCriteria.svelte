<script lang="ts">
	import { Table } from '$lib/components';
	import { eligibilityCriteriaColumnDefCommon, checkIsCriteriaCompleted } from '$lib/features';
	import { type ICampaignSummaryProps } from '$lib/types';

	export let campaign: ICampaignSummaryProps['campaign'];

	$: toggleValue = 'all';

	$: eligibilityCriteriaTable = {
		data: [
			...campaign.criteria.filter((item) => {
				const isCompleted = checkIsCriteriaCompleted(item);
				if (toggleValue === 'all' && isCompleted) {
					return true;
				}
				if (toggleValue === item.category && isCompleted) {
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
