<script lang="ts">
	import { Container, Typography } from '$lib/components';
	import { CampaignSummary, campaignStore } from '$lib/features';

	const { campaignDetails } = campaignStore;
</script>

<Container label="Campaign Preview">
	<div class="flex flex-col gap-5 w-full">
		<Typography variant="h5"
			>EtherLend Protocol Airdrop: Empowering DeFi Lending on Ethereum
		</Typography>
		<CampaignSummary campaign={$campaignDetails} />
	</div>
</Container>
