<script lang="ts">
	import { CampaignTimeLineItem } from '$lib/features';
	import { Typography, ToggleButton } from '$lib/components';
	import {
		ECampaignPhase,
		type ICampaignTimeLineItemProps,
		type ICampaignTimeLineProps
	} from '$lib/types';

	export let campaign: ICampaignTimeLineProps['campaign'];
	export let title: string = 'Phase';
	export let isCollapsable: boolean = true;
	export let isTimelineOpen: boolean = false;

	const handleTimeLineClick = () => {
		isTimelineOpen = !isTimelineOpen;
	};

	const timeLineDraft = {
		title: 'Campaign Draft',
		description:
			'This is the initial draft phase where the campaign is being set up and criteria can be discussed.',
		date: new Date(),
		phase: ECampaignPhase.DRAFT,
		numericPhase: 0
	} as ICampaignTimeLineItemProps;

	const timeLineVoteCriteria = {
		title: 'Criteria Voting',
		description:
			'Delegates are voting now for or against the airdrop criteria proposed by the campaigner. The voting phase lasts one week.',
		date: new Date('2024-10-25'),
		phase: ECampaignPhase.CRITERIA,
		numericPhase: 1
	} as ICampaignTimeLineItemProps;

	const timeLineDataIndexing = {
		title: 'Data Indexing',
		description:
			'In this phase, at least one data provider is processing the snapshot criteria to determine the token allocations per address.',
		date: new Date('2024-11-17'),
		phase: ECampaignPhase.DATA_INDEXING,
		numericPhase: 2
	} as ICampaignTimeLineItemProps;

	const timeLineVoteDistribution = {
		title: 'Distribution Voting',
		description:
			'In this phase, the delegates vote to decide whether the indexer results are accepted and token can get distributed.',
		date: new Date('2024-11-20'),
		phase: ECampaignPhase.DISTRIBUTION_VOTING,
		numericPhase: 3
	} as ICampaignTimeLineItemProps;

	const timeLineSuccessfulAirdrop = {
		title: 'Successful Airdrop',
		description:
			'This campaign has successfully achieved consensus about the eligibility and tokens have been distributed to recipients.',
		date: new Date('2024-11-25'),
		phase: ECampaignPhase.TOKEN_DISTRIBUTION,
		numericPhase: 4
	} as ICampaignTimeLineItemProps;

	const options: Record<ECampaignPhase, ICampaignTimeLineItemProps> = {
		[ECampaignPhase.DRAFT]: timeLineDraft,
		[ECampaignPhase.CRITERIA]: timeLineVoteCriteria,
		[ECampaignPhase.DATA_INDEXING]: timeLineDataIndexing,
		[ECampaignPhase.DISTRIBUTION_VOTING]: timeLineVoteDistribution,
		[ECampaignPhase.TOKEN_DISTRIBUTION]: timeLineSuccessfulAirdrop
	};

	$: activePhase = (campaign?.phase as ECampaignPhase) || 'Draft';

	$: activeNumericPhase = () => {
		switch (activePhase) {
			case 'Draft':
				return 0;
			case 'Criteria':
				return 1;

			case 'Data Indexing':
				return 2;

			case 'Distribution Voting':
				return 3;

			case 'Token Distribution':
				return 4;

			default:
				return 0;
		}
	};

	$: getStatus = (activeNumericPhase: number, numericPhase: number) => {
		if (!isTimelineOpen) {
			return 'ongoing';
		}
		if (numericPhase < activeNumericPhase) {
			return 'passed';
		}
		if (activeNumericPhase === numericPhase) {
			return 'ongoing';
		}
		return 'planned';
	};

	$: activeTimeLine = options[activePhase] || {
		title: 'Unknown Phase',
		description: 'No information available.',
		status: 'rejected',
		numericPhase: 0
	};
</script>

<div class="flex flex-col gap-4 campaign-timeline-container">
	{#if isCollapsable}
		<div class="flex flex-row justify-between">
			<Typography variant="badge">{title}</Typography>
			<ToggleButton isOpen={isTimelineOpen ?? false} onClick={handleTimeLineClick} />
		</div>
	{/if}
	<div
		class="flex flex-col gap-8 campaign-timeline-content {!isCollapsable ? 'is-collapsable' : ''}"
	>
		{#if isTimelineOpen}
			<div class="flex flex-col gap-1">
				{#each Object.values(options) as phaseOptions, index}
					<CampaignTimeLineItem
						{...phaseOptions}
						isExpanded={isTimelineOpen}
						status={getStatus(activeNumericPhase(), phaseOptions.numericPhase ?? 0)}
						isFirst={index === 0}
						isLast={index === Object.values(options).length - 1}
					/>
				{/each}
			</div>
		{:else}
			<div>
				<CampaignTimeLineItem
					{...activeTimeLine}
					status={getStatus(activeNumericPhase(), activeTimeLine.numericPhase ?? 0)}
				/>
			</div>
		{/if}
	</div>
</div>

<style lang="less">
	.campaign-timeline-content {
		padding: 8px;
		border: 0.5px solid var(--default-border);
		border-radius: 4px;
		&.is-collapsable {
			background: var(--highlight-bg);
		}
	}
</style>
