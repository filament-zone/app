<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		campaignDetailsStore,
		isCampaignDelegate,
		isCampaignOwner,
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
	import ChevronRightIcon from '$lib/assets/icons/chevron-right.svg?component';

	export let campaign: ICampaignTimeLineProps['campaign'];
	export let isOpen: ICampaignTimeLineProps['isOpen'] = false;

	let isTimelineOpen = isOpen;

	const { openModal } = modalStore;
	const { initCampaign } = campaignDetailsStore;
	const { wallet } = walletStore;

	$: phase = campaign?.phase ?? '';
	$: isOwner = isCampaignOwner(campaign?.campaigner as string, $wallet.address as string);

	$: isAbleToVote = isCampaignDelegate(
		[...(campaign as ICampaign).delegates] as string[],
		$wallet.address as string
	);

	const handleTimeLineClick = () => {
		isTimelineOpen = !isTimelineOpen;
	};

	const timeLineDraftData: ITimeLineItemProps = {
		iconStatus: ETimeLineItem.CHECKED,
		title: 'Campaign Draft',
		description: 'The campaign draft has been finalized and saved',
		status: 'success',
		date: new Date(),
		isFirst: true
	};

	$: timeLineInitData = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Initiate Campaign',
		description: 'The campaign is being initiated',
		status: 'to-do',
		onButtonClick: isOwner
			? async () => {
					await initCampaign(campaign?.id as bigint);
				}
			: null,
		buttonLabel: 'Initiate Campaign'
	} as ITimeLineItemProps;

	$: timeLineVoteData = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Confirm Token Distribution',
		description:
			'In this phase, the delegates vote to decide whether the indexer results are accepted and token can get distributed.',
		status: 'to-do',
		isLast: true
	} as ITimeLineItemProps;

	let options: Record<string, ITimeLineItemProps[]>;
	$: options = {
		Draft: [timeLineVoteData, timeLineInitData, timeLineDraftData],
		Criteria: [
			{
				...timeLineVoteData,
				onButtonClick: isAbleToVote
					? async () => {
							openModal({
								variant: EModalVariant.CAMPAIGN_VOTE,
								state: { campaignId: campaign?.id }
							});
						}
					: null,
				buttonLabel: isAbleToVote ? 'Vote' : ''
			},
			{
				...timeLineInitData,
				iconStatus: ETimeLineItem.CHECKED,
				status: 'success',
				date: new Date().toLocaleString(),
				onButtonClick: null,
				buttonLabel: null
			},
			timeLineDraftData
		]
	};
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-row justify-between">
		<Typography variant="caption">Timeline:</Typography>
		<div
			class="cursor-pointer"
			style="color: var(--primary-white)"
			on:click={handleTimeLineClick}
			aria-hidden="true"
		>
			{#if isTimelineOpen}
				<ChevronRightIcon style="transform: scale(0.7);" />
			{:else}
				<ChevronDownIcon style="transform: scale(0.7);" />
			{/if}
		</div>
	</div>
	<div class="flex flex-col">
		<TimeLineItem {...options[phase][0]} />
		{#if isTimelineOpen}
			<div transition:fade>
				{#each options[phase].slice(1) as option}
					<TimeLineItem {...option} />
				{/each}
			</div>
		{/if}
	</div>
</div>
