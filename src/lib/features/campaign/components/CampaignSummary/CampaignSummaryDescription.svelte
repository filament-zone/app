<script lang="ts">
	import { Typography } from '$lib/components';
	import type { ICampaignSummaryProps } from '$lib/types';

	export let campaign: ICampaignSummaryProps['campaign'];
</script>

<div>
	<Typography variant="h4">Description:</Typography>
	<Typography variant="h5">{campaign.description ?? ''}</Typography>
</div>
