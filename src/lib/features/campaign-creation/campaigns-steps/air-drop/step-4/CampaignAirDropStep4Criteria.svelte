<script lang="ts">
	import { Table } from '$lib/components';
	import { campaignStore, eligibilityCriteriaColumnDefCommon } from '$lib/features';
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';

	const data = derived(page, () => $page.data);
	const { campaignDetails } = campaignStore;

	$: toggleValue = 'all';

	$: eligibilityCriteriaTable = {
		...$data.step2Data.eligibilityCriteriaTable,
		data: [
			...$campaignDetails.criteria.filter((item) => {
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
