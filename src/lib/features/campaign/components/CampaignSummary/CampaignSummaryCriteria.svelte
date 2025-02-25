<script lang="ts">
	import { Table } from '$lib/components';
	import { eligibilityCriteriaColumnDefCommon } from '$lib/features';
	import { type ICampaignSummaryProps } from '$lib/types';

	interface Props {
		campaign: ICampaignSummaryProps['campaign'];
	}

	let { campaign }: Props = $props();

	let toggleValue = $derived('all');

	let eligibilityCriteriaTable = $derived({
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
	});
</script>

<div>
	<Table {...eligibilityCriteriaTable} />
</div>
