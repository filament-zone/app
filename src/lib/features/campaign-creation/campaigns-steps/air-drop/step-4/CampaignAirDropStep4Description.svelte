<script lang="ts">
	import { campaignStore } from '$lib/features';
	import { Typography } from '$lib/components';

	const { campaignDetails } = campaignStore;
</script>

<div>
	<Typography variant="h4">Description:</Typography>
	<Typography variant="h5">{$campaignDetails.description ?? ''}</Typography>
</div>
