<script lang="ts">
	import { Container } from '$lib/components';
	import { CampaignSummary, campaignStore } from '$lib/features';

	const { campaignDetails } = campaignStore;
</script>

<Container label="Campaign Preview" variant="secondary">
	<CampaignSummary campaign={$campaignDetails} />
</Container>
