<script lang="ts">
	import { fade } from 'svelte/transition';
	import { TimeLineItem, Typography, ToggleButton } from '$lib/components';
	import { ETimeLineItem, type ICampaignTimeLineProps, type ITimeLineItemProps } from '$lib/types';
	import type { CampaignPhase } from '@filament-zone/filament/Phase';

	export let campaign: ICampaignTimeLineProps['campaign'];
	export let title: string = 'Phase';
	export let isCollapsable: boolean = true;
	export let isTimelineOpen: boolean = false;

	const handleTimeLineClick = () => {
		isTimelineOpen = !isTimelineOpen;
	};

	const timeLineDraft = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Campaign Draft',
		description:
			'This is the initial draft phase where the campaign is being set up and criteria can be discussed.',
		date: new Date(),
		phase: 'Draft' as CampaignPhase,
		numericPhase: 0
	} as ITimeLineItemProps;

	const timeLineVoteCriteria = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Criteria Voting',
		description:
			'Delegates are voting now for or against the airdrop criteria proposed by the campaigner. The voting phase lasts one week.',
		date: new Date('2024-10-25'),
		phase: 'Criteria' as CampaignPhase,
		numericPhase: 1
	} as ITimeLineItemProps;

	const timeLineDataIndexing = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Data Indexing',
		description:
			'In this phase, at least one data provider is processing the snapshot criteria to determine the token allocations per address.',
		date: new Date('2024-11-17'),
		phase: 'Data Indexing' as CampaignPhase,
		numericPhase: 2
	} as ITimeLineItemProps;

	const timeLineVoteDistribution = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Distribution Voting',
		description:
			'In this phase, the delegates vote to decide whether the indexer results are accepted and token can get distributed.',
		date: new Date('2024-11-20'),
		phase: 'Distribution Voting' as CampaignPhase,
		numericPhase: 3
	} as ITimeLineItemProps;

	const timeLineSuccessfulAirdrop = {
		iconStatus: ETimeLineItem.CHECKED,
		title: 'Successful Airdrop',
		description:
			'This campaign has successfully achieved consensus about the eligibility and tokens have been distributed to recipients.',
		date: new Date('2024-11-25'),
		phase: 'Token Distribution' as CampaignPhase,
		numericPhase: 4
	} as ITimeLineItemProps;

	const options: Record<CampaignPhase, ITimeLineItemProps> = {
		Draft: timeLineDraft,
		'Criteria Voting': timeLineVoteCriteria,
		'Data Indexing': timeLineDataIndexing,
		'Distribution Voting': timeLineVoteDistribution,
		'Token Distribution': timeLineSuccessfulAirdrop
	};

	const activeNumericPhase = campaign?.numericPhase || 0;

	const getStatus = (activeNumericPhase: number, numericPhase: number) => {
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

	const activePhase = (campaign?.phase as CampaignPhase) || 'Draft';
	const activeTimeLine = options[activePhase] || {
		title: 'Unknown Phase',
		description: 'No information available.',
		status: 'rejected',
		numericPhase: 0
	};

	// Log each option used to render the component
	Object.entries(options).forEach((option) => {
		console.log('Option:', option);
	});
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
			<div transition:fade={{ duration: 300 }} class="flex flex-col gap-1">
				{#each Object.values(options) as phaseOptions, index}
					<TimeLineItem
						{...phaseOptions}
						status={getStatus(activeNumericPhase, phaseOptions.numericPhase)}
						{isTimelineOpen}
						isFirst={index === 0}
						isLast={index === Object.values(options).length - 1}
					/>
				{/each}
			</div>
		{:else}
			<TimeLineItem
				{...activeTimeLine}
				status={activeNumericPhase === 0
					? 'planned'
					: activeNumericPhase === 4
						? 'passed'
						: 'ongoing'}
				isFirst={activeNumericPhase === 0}
				isLast={activeNumericPhase === 4}
			/>
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
