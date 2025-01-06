<script lang="ts">
	import { fade } from 'svelte/transition';
	import { CampaignApi } from '$lib/api';
	import { TimeLineItem, Typography } from '$lib/components';
	import { ETimeLineItem, type ICampaignTimeLineProps, type ITimeLineItemProps } from '$lib/types';
	import ChevronDownIcon from '$lib/assets/icons/chevron-down.svg?component';
	import ChevronRightIcon from '$lib/assets/icons/chevron-right.svg?component';

	export let campaign: ICampaignTimeLineProps['campaign'];
	export let isOpen: ICampaignTimeLineProps['isOpen'] = false;

	let isTimelineOpen = isOpen;

	const handleTimeLineClick = () => {
		isTimelineOpen = !isTimelineOpen;
	};

	const phase = campaign?.phase ?? 'draft';

	const timeLineDraftCommonData: ITimeLineItemProps = {
		iconStatus: ETimeLineItem.CHECKED,
		title: 'Campaign Draft',
		description: 'The campaign draft has been finalized and saved',
		status: 'success',
		date: new Date().toLocaleString(),
		isFirst: true
	};
	const timeLineInitCommonData: ITimeLineItemProps = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Initiate Campaign',
		description: 'The campaign is being initiated',
		status: 'to-do',
		onButtonClick: async () => {
			const tx = await CampaignApi.initCampaign({ campaign_id: BigInt(campaign?.id) });

			tx.onSuccess(() => {
				console.log('success vote');
			});

			await tx.run();
		},
		buttonLabel: 'Initiate Campaign'
	};
	const timeLineInitVoteData: ITimeLineItemProps = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Confirm Token Distribution',
		description:
			'In this phase, the delegates vote to decide whether the indexer results are accepted and token can get distributed.',
		status: 'to-do',
		isLast: true
	};

	const options: Record<string, ITimeLineItemProps[]> = {
		Draft: [timeLineInitVoteData, timeLineInitCommonData, timeLineDraftCommonData],
		Criteria: [
			{
				...timeLineInitVoteData,
				buttonLabel: 'Vote'
			},
			{
				...timeLineInitCommonData,
				iconStatus: ETimeLineItem.CHECKED,
				status: 'success',
				date: new Date().toLocaleString(),
				onButtonClick: null,
				buttonLabel: null
			},
			timeLineDraftCommonData
		]
	};
</script>

<div>
	<div class="flex flex-row justify-between gap-4">
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
