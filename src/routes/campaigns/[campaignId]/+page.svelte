<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { routes } from '$lib/constants';
	import {
		CampaignSummary,
		modalStore,
		campaignDetailsStore,
		walletStore,
		isCampaignDelegate,
		isCriteriaVoteAccessibleFn
	} from '$lib/features';
	import {
		Badge,
		Button,
		SecondaryDoughnutChart,
		Typography,
		Container,
		Ticker,
		Toggle
	} from '$lib/components';
	import {
		EButtonSizeVariant,
		EModalVariant,
		EBadgeColorVariant,
		EButtonStyleVariant,
		type ICampaign,
		EToggleVariant,
		type IToggleProps,
		EToggleSizeVariant
	} from '$lib/types';
	import { generateMockCampaign } from '$lib/features/campaign/mock';
	import { ECampaignPhase } from '$lib/api/campaign/campaign.hub.api.enums';

	export let data;

	const { campaignDetails, initCampaign } = campaignDetailsStore;
	const { openModal } = modalStore;
	const { wallet } = walletStore;

	$: campaign = $campaignDetails ?? data.campaign ?? generateMockCampaign();

	$: isDelegate = isCampaignDelegate(Object.keys(campaign.delegates), $wallet.address as string);

	$: isCriteriaVoteAccessible = isCriteriaVoteAccessibleFn(
		campaign?.phase as ICampaign['phase'],
		isDelegate,
		$wallet.address as string
	);

	$: handleVote = () => {
		if (!isCriteriaVoteAccessible) {
			return;
		} else {
			openModal({ variant: EModalVariant.CAMPAIGN_VOTE, state: { campaignId: campaign?.id } });
		}
	};

	onDestroy(() => {
		campaignDetails.set(undefined);
	});

	let toggleOptions: IToggleProps<string>['options'] = [
		{ value: 'criteria', label: 'Criteria' },
		{ value: 'governance', label: 'Delegates' }
	];

	let toggleValue = '';
	onMount(() => {
		if (campaign.phase)
			if (toggleOptions?.length) {
				toggleValue = toggleOptions?.[0].value;
			}
	});
</script>

<div class="flex flex-col xl:flex-row gap-4">
	<div class="w-8/12">
		<Container label="Campaign Details" variant="secondary">
			<Button
				slot="header"
				on:click={() => {
					goto(routes.CAMPAIGNS.MANAGE.ROOT);
				}}>Return to list</Button
			>
			<div class="flex flex-col gap-4">
				<CampaignSummary {campaign} useTimeline={true} />
			</div>
		</Container>
	</div>
	<div class="flex flex-col w-4/12 gap-4">
		{#if campaign.phase === ECampaignPhase.DRAFT}
			<Container label="Setup">
				<div class="flex flex-col gap-4">
					<Typography variant="caption">
						In order to initiate the campaign, you have to deposit the collateral of 1 bFILA first.
						One bFILA currently is worth about 14,000 FILA token.
					</Typography>
					<Button
						on:click={initCampaign.bind(null, campaign.id)}
						styleVariant={EButtonStyleVariant.HIGHLIGHT}
						sizeVariant={EButtonSizeVariant.FULL_WIDTH}>Initiate</Button
					>
				</div>
			</Container>
		{/if}
		{#if campaign.phase !== ECampaignPhase.DRAFT}
			<Container label="Vote">
				<Toggle
					options={toggleOptions}
					variant={EToggleVariant.SECONDARY}
					bind:value={toggleValue}
					slot="above-container"
					sizeVariant={EToggleSizeVariant.FULL_WIDTH}
				/>
				<div class="flex flex-col gap-4">
					<div class="flex flex-row justify-between">
						<Badge
							label="Turnout:"
							RightContent="48%"
							RightContentColorVariant="purple"
							colorVariant={EBadgeColorVariant.SECONDARY}
						/>
						<Badge
							label="Time Left:"
							RightContent="7D 42M"
							RightContentColorVariant="purple"
							colorVariant={EBadgeColorVariant.SECONDARY}
						/>
					</div>
					{#if data.chartData}
						<SecondaryDoughnutChart chartData={data.chartData} class="w-full" />
					{:else}
						<div class="flex justify-center items-center h-[300px]">
							<Typography variant="h5">No data available</Typography>
						</div>
					{/if}
					<Button
						sizeVariant={EButtonSizeVariant.FULL_WIDTH}
						on:click={handleVote}
						disabled={!isCriteriaVoteAccessible}>Vote</Button
					>
				</div>
			</Container>
			<Container label="Ticker">
				<Toggle
					options={toggleOptions}
					variant={EToggleVariant.SECONDARY}
					bind:value={toggleValue}
					slot="above-container"
					sizeVariant={EToggleSizeVariant.FULL_WIDTH}
				/>
				<div class="flex flex-col gap-2 h-[384px] overflow-x-hidden overflow-y-auto">
					{#if data.tickerData?.length}
						{#each data.tickerData as item}
							<Ticker {...item} />
						{/each}
					{:else}
						<div class="flex justify-center items-center h-[300px]">
							<Typography variant="h5">No data available</Typography>
						</div>
					{/if}
				</div>
			</Container>
		{/if}
	</div>
</div>
