<script lang="ts">
	import { setContext } from 'svelte';
	import { Container, Typography } from '$lib/components';
	import { createStepBarStore, CampaignSummary, campaignStore } from '$lib/features';

	const { campaignDetails } = campaignStore;

	const summarySteps = [
		{ value: 1, label: '1', description: 'Initiated', isActive: true, isCompleted: false },
		{
			value: 2,
			label: '2',
			description: 'Criteria Voting',
			isActive: false,
			isCompleted: false
		},
		{ value: 3, label: '3', description: 'Review', isActive: false, isCompleted: false },
		{
			value: 4,
			label: '4',
			description: 'Distribution Voting',
			isActive: false,
			isCompleted: false
		},
		{ value: 5, label: '5', description: 'Finished', isActive: false, isCompleted: false }
	];
	const summaryContextId = 'summaryStepBarStore';
	setContext(summaryContextId, createStepBarStore(summarySteps));
</script>

<Container label="Campaign Preview">
	<div class="flex flex-col gap-5 w-full">
		<Typography variant="h5"
			>EtherLend Protocol Airdrop: Empowering DeFi Lending on Ethereum
		</Typography>
		<CampaignSummary campaign={$campaignDetails} />
	</div>
</Container>
