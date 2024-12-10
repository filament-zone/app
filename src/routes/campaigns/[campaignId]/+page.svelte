<script lang="ts">
	import { fade } from 'svelte/transition';
	import moment from 'moment/moment.js';
	import { CampaignSummary, CampaignTimeLineItem, modalStore } from '$lib/features';
	import { Badge, Button, Container, Divider, PrimaryDoughnutChart } from '$lib/components';
	import { EButtonSizeVariant, ECampaignTimeLineItem, EModalVariant } from '$lib/types';
	import ChevronRightIcon from '$lib/assets/icons/chevron-right.svg?component';
	import ChevronDownIcon from '$lib/assets/icons/chevron-down.svg?component';

	export let data;

	const { openModal } = modalStore;

	let isTimelineOpen = false;

	const handleTimeLineClick = () => {
		isTimelineOpen = !isTimelineOpen;
	};

	const handleVote = () => {
		openModal({ variant: EModalVariant.CAMPAIGN_VOTE });
	};
</script>

<div class="flex flex-col xl:flex-row gap-4">
	<div class="w-full">
		<Container label="Campaign Preview">
			<div class="flex flex-col gap-4">
				<div>
					<span class="campaign-label">{data.campaign.title}</span>
				</div>
				<Divider />
				<div>
					<div class="flex flex-row items-center gap-4">
						<span class="time-line">Timeline</span>
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
					{#if isTimelineOpen}
						<div class="flex flex-col" transition:fade>
							<CampaignTimeLineItem
								iconStatus={ECampaignTimeLineItem.PROCESSING}
								title="Deposit Collateral"
								description="In order to initiate the campaign you have to deposit the campaign collateral."
								status={data.campaign.collateralStatus?.status}
								isLast
							/>
							<CampaignTimeLineItem
								iconStatus={ECampaignTimeLineItem.CHECKED}
								title="Signed Deposit Transaction"
								description="The campaign draft has been finalized and saved"
								date={data.campaign.collateralStatus?.date}
								status={'success'}
							/>

							<CampaignTimeLineItem
								iconStatus={ECampaignTimeLineItem.CHECKED}
								title="Campaign Draft"
								description="The campaign draft has been finalized and saved"
								date={data.campaign.collateralStatus?.date}
								status={'success'}
								isFirst
							/>
						</div>
					{/if}
				</div>
				<Divider />
				<CampaignSummary campaign={data.campaign} />
			</div>
		</Container>
	</div>
	<div class="flex flex-col min-w-[384px] gap-4">
		<Container label="Voting">
			<div class="flex flex-col gap-4">
				<Badge label="Turnout: 48%" />
				<PrimaryDoughnutChart
					chartData={data.chartData}
					centerText={['Text', '2.43B']}
					class="w-full"
				/>
				<Button sizeVariant={EButtonSizeVariant.FULL_WIDTH} on:click={handleVote}>Vote</Button>
			</div>
		</Container>
		<Container label="Ticker">
			<div class="flex flex-col gap-2 h-[384px] overflow-x-hidden overflow-y-scroll">
				{#each data.tickerData as item}
					<div class="ticker-item">
						<div class="ticker-item__name">{item?.name}</div>
						<div class="ticker-item__date">{moment(item?.date).format('MMM DD, YYYY')}</div>
						<div class="ticker-item__status">
							<span
								style={`color: ${item?.status.toLocaleLowerCase() === 'approved' ? 'var(--upOnly-600)' : 'var(--rugged-600)'}`}
							>
								{item?.status}</span
							>
						</div>
					</div>
				{/each}
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

	.time-line {
		color: var(--primary-white);
		font-family: var(--primary-font);
		font-size: 13px;
		font-style: normal;
		font-weight: 450;
		line-height: 12px;
		letter-spacing: 0.65px;
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
