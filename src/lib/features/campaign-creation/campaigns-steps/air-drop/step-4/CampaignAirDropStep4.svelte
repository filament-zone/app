<script lang="ts">
	import { setContext } from 'svelte';
	import { Container, Toggle, Typography } from '$lib/components';
	import {
		CampaignAirDropStep4Criteria,
		CampaignAirDropStep4Delegates,
		CampaignAirDropStep4Description,
		CampaignAirDropStep4Votes,
		createStepBarStore,
		StepBar
	} from '$lib/features';
	import { EToggleVariant, type IToggleProps } from '$lib/types';

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

	const toggleOptions: IToggleProps<string>['options'] = [
		{ value: 'description', label: 'Description' },
		{ value: 'criteria', label: 'Criteria' },
		{ value: 'governance', label: 'Delegates' },
		{ value: 'votes', label: 'Votes' }
	];

	$: toggleValue = toggleOptions[0].value;
</script>

<Container label="Campaign Preview">
	<div class="flex flex-col gap-5 w-full">
		<Typography variant="h5"
			>EtherLend Protocol Airdrop: Empowering DeFi Lending on Ethereum
		</Typography>
		<StepBar contextId={summaryContextId} />
		<Toggle options={toggleOptions} variant={EToggleVariant.SECONDARY} bind:value={toggleValue} />
		{#if toggleValue === 'description'}
			<CampaignAirDropStep4Description />
		{:else if toggleValue === 'criteria'}
			<CampaignAirDropStep4Criteria />
		{:else if toggleValue === 'governance'}
			<CampaignAirDropStep4Delegates />
		{:else if toggleValue === 'votes'}
			<CampaignAirDropStep4Votes />
		{/if}
	</div>
</Container>
