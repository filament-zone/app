<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		isCampaignDelegate,
		isCriteriaVoteAccessibleFn,
		modalStore,
		walletStore
	} from '$lib/features';
	import { TimeLineItem, Typography } from '$lib/components';
	import {
		EModalVariant,
		ETimeLineItem,
		type ICampaign,
		type ICampaignTimeLineProps,
		type ITimeLineItemProps
	} from '$lib/types';
	import ChevronDownIcon from '$lib/assets/icons/chevron-down.svg?component';
	import ChevronUpIcon from '$lib/assets/icons/chevron-up.svg?component';

	export let campaign: ICampaignTimeLineProps['campaign'];
	export let isOpen: ICampaignTimeLineProps['isOpen'] = false;
	export let title: string = 'Timeline';
	export let isCollapsable: boolean = true;

	console.log('title', title);
	console.log('isOpen', isOpen);
	console.log('isCollapsable', isCollapsable);

	let isTimelineOpen = isOpen;

	const { openModal } = modalStore;
	const { wallet } = walletStore;

	$: phase = campaign?.phase ?? '';
	$: isDelegate = isCampaignDelegate(campaign?.delegates as string[], $wallet.address as string);

	$: isCriteriaVoteAccessible = isCriteriaVoteAccessibleFn(
		campaign?.phase as ICampaign['phase'],
		isDelegate,
		$wallet.address as string
	);

	const handleTimeLineClick = () => {
		isTimelineOpen = !isTimelineOpen;
	};

	$: timeLineVoteCriteria = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Criteria Voting',
		description:
			'Delegates are voting now for or against the airdrop criteria proposed by the campaigner. The voting phase lasts one week.',
		status: 'ongoing',
		date: new Date('2024-10-25'),
		phase: '1'
	} as ITimeLineItemProps;

	$: timeLineDataIndexing = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Data Indexing',
		description:
			'In this phase, at least one data provider is processing the snapshot criteria to determine the token allocations per address.',
		status: 'ongoing',
		date: new Date('2024-11-17'),
		phase: '2'
	} as ITimeLineItemProps;

	$: timeLineVoteDistribution = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Distribution Voting',
		description:
			'In this phase, the delegates vote to decide whether the indexer results are accepted and token can get distributed.',
		status: 'ongoing',
		date: new Date('2024-11-20'),
		phase: '3'
	} as ITimeLineItemProps;

	$: timeLineSuccessfulAirdrop = {
		iconStatus: ETimeLineItem.CHECKED,
		title: 'Successful Airdrop',
		description:
			'This campaign has successfully achieved consensus about the eligibility and tokens have been distributed to recipients.',
		status: 'completed',
		date: new Date('2024-11-25'),
		phase: '4'
	} as ITimeLineItemProps;

	let options: Record<string, ITimeLineItemProps[]>;
	$: options = {
		Draft: [
			timeLineVoteCriteria,
			timeLineDataIndexing,
			timeLineVoteDistribution,
			timeLineSuccessfulAirdrop
		],
		Criteria: [
			{
				...timeLineVoteCriteria,
				onButtonClick: isCriteriaVoteAccessible
					? async () => {
							openModal({
								variant: EModalVariant.CAMPAIGN_VOTE,
								state: { campaignId: campaign?.id }
							});
						}
					: null,
				buttonLabel: isCriteriaVoteAccessible ? 'Vote' : ''
			},
			{
				...timeLineDataIndexing,
				iconStatus: ETimeLineItem.CHECKED,
				status: 'success',
				date: new Date().toLocaleString(),
				onButtonClick: null,
				buttonLabel: null
			},
			timeLineVoteDistribution,
			timeLineSuccessfulAirdrop
		]
	};

	$: isTimelineOpen = isOpen && options[phase].length > 1;
</script>

<div class="flex flex-col gap-4">
	{#if isCollapsable}
		<div class="flex flex-row justify-between">
			<Typography variant="badge">{title}</Typography>
			<div
				class="cursor-pointer"
				style="color: var(--primary-white)"
				on:click={handleTimeLineClick}
				aria-hidden="true"
			>
				{#if isTimelineOpen}
					<ChevronUpIcon style="transform: scale(0.7);" />
				{:else}
					<ChevronDownIcon style="transform: scale(0.7);" />
				{/if}
			</div>
		</div>
	{/if}
	<div class="flex flex-col gap-6">
		<TimeLineItem {...options[phase][0]} />
		{#if isTimelineOpen}
			<div class="flex flex-col gap-4" transition:fade>
				{#each options[phase].slice(1) as option}
					<TimeLineItem
						{...option}
						isFirst={false}
						isLast={false}
						isTimelineOpen={!isTimelineOpen}
					/>
				{/each}
			</div>
		{/if}
	</div>
</div>
