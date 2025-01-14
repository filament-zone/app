<script lang="ts">
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import moment from 'moment/moment.js';
	import { routes } from '$lib/constants';
	import {
		CampaignSummary,
		modalStore,
		campaignDetailsStore,
		walletStore,
		isCampaignDelegate
	} from '$lib/features';
	import {
		Badge,
		Button,
		CampaignTimeLine,
		Container,
		Divider,
		SecondaryDoughnutChart
	} from '$lib/components';
	import { EButtonSizeVariant, EModalVariant, EBadgeColorVariant } from '$lib/types';
	import { generateMockCampaign } from '$lib/features/campaign/mock';

	export let data;

	const { campaignDetails } = campaignDetailsStore;
	const { openModal } = modalStore;
	const { wallet } = walletStore;

	$: campaign = $campaignDetails ?? data.campaign ?? generateMockCampaign();

	$: isCriteriaInaccessible = (!isDelegate && campaign?.phase !== 'Criteria') || !$wallet.address;

	$: handleVote = () => {
		if (isCriteriaInaccessible) {
			return;
		} else {
			openModal({ variant: EModalVariant.CAMPAIGN_VOTE, state: { campaignId: campaign?.id } });
		}
	};

	onDestroy(() => {
		campaignDetails.set(undefined);
	});

	$: isDelegate = isCampaignDelegate(campaign?.delegates as string[], $wallet.address as string);
</script>

<div class="flex flex-col xl:flex-row gap-4">
	<div class="w-full">
		<Container label="Campaign Preview">
			<Button
				slot="header"
				on:click={() => {
					goto(routes.CAMPAIGNS.MANAGE.ROOT);
				}}>Back to list</Button
			>
			<div class="flex flex-col gap-4">
				<div>
					<span class="campaign-label">{campaign?.title}</span>
				</div>
				<Divider />
				{#if campaign}
					<CampaignTimeLine {campaign} />
				{/if}
				<Divider />
				<CampaignSummary {campaign} />
			</div>
		</Container>
	</div>
	<div class="flex flex-col min-w-[384px] gap-4">
		<Container label="Voting">
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
				<SecondaryDoughnutChart chartData={data.chartData} class="w-full" />
				<Button
					sizeVariant={EButtonSizeVariant.FULL_WIDTH}
					on:click={handleVote}
					disabled={isCriteriaInaccessible}>Vote</Button
				>
			</div>
		</Container>
		<Container label="Ticker">
			<div class="flex flex-col gap-2 h-[384px] overflow-x-hidden overflow-y-scroll">
				{#if data.tickerData?.length}
					{#each data.tickerData as item}
						<div class="ticker-item">
							<div class="ticker-item__name">{item?.name}</div>
							<div class="ticker-item__date">{moment(item?.date).format('MMM DD, YYYY')}</div>
							<div class="ticker-item__status">
								<span
									style={`color: ${item?.status.toLocaleLowerCase() === 'approved' ? '#00F58C' : '#FF679B'}`}
								>
									{item?.status}</span
								>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</Container>
	</div>
</div>

<style lang="less">
	.campaign-label {
		color: var(--primary-white);
		font-family: var(--primary-font);
		font-size: 20px;
		font-style: normal;
		font-weight: 450;
		line-height: 20px;
	}

	.ticker-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 4px;
		border-radius: 4px;
		border: 0.5px solid var(--default-border);
		background: var(--highlight-bg, #1b1b1b);
		padding: 4px 8px;
		position: relative;

		.ticker-item__name {
			color: #fffef6;
			font-family: var(--secondary-font);
			font-size: 12px;
			font-style: normal;
			font-weight: 500;
			line-height: 12px;
		}

		.ticker-item__date {
			color: var(--primary-white);
			font-family: var(--primary-font);
			font-size: 13px;
			font-style: normal;
			font-weight: 450;
			line-height: 12px;
			letter-spacing: 0.65px;
			opacity: 0.5;

			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}

		.ticker-item__status {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 6px 8px;
			border-radius: 4px;
			background: var(--darkNet);
			width: 70px;
			height: 24px;

			span {
				font-family: var(--primary-font);
				font-size: 12px;
				font-weight: 500;
			}
		}
	}
</style>
