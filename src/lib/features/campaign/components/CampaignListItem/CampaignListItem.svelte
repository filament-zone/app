<script lang="ts">
	import moment from 'moment/moment.js';
	import { goto } from '$app/navigation';
	import { CampaignTimeLineItem, modalStore } from '$lib/features';
	import { Badge, Button, Divider, Typography } from '$lib/components';
	import { routes } from '$lib/constants';
	import { replaceUrlParams } from '$lib/helpers';
	import {
		type ICampaignListItemProps,
		EButtonStyleVariant,
		ECampaignTimeLineItem,
		EModalVariant
	} from '$lib/types';

	export let campaign: ICampaignListItemProps['campaign'];

	const { openModal } = modalStore;

	const handleOpenCampaignDetails = () => {
		goto(
			replaceUrlParams(routes.CAMPAIGNS.CAMPAIGN_ID.ROOT, {
				campaignId: campaign.id.toString()
			})
		);
	};
</script>

<div class="campaign-list-item-container">
	<div class="header" aria-hidden="true">
		<Typography variant="h4">{campaign.title}</Typography>
		<Button on:click={handleOpenCampaignDetails}>Campaign Details</Button>
	</div>
	<div class="content">
		<div class="flex flex-row justify-between">
			<div class="flex flex-col">
				<Typography variant="h6">Status</Typography>
				<Badge label="Draft" />
			</div>
			<div class="flex flex-col w-auto">
				<Typography variant="h6">Collateral Bond</Typography>
				<div class="flex flex-row w-[250px] gap-8">
					<div>
						<Typography variant="h6" color="var(--filaMint)" class="text-nowrap"
							>Not initiated</Typography
						>
					</div>
				</div>
			</div>
			<div class="flex flex-col">
				<Typography variant="h6">Created at</Typography>
				<Typography variant="h6"
					>{moment.utc(campaign.createdAt).format('MMMM D, YYYY [at] h:mm a [(UTC)]')}
				</Typography>
			</div>
		</div>
		<Divider />
		<div>
			<Typography variant="caption">Timeline</Typography>
			<div class="flex flex-col">
				<CampaignTimeLineItem
					iconStatus={ECampaignTimeLineItem.PROCESSING}
					title="Voting phase"
					description="The campaign is in the voting phase"
					status={'to-do'}
					isLast
				/>
				<CampaignTimeLineItem
					iconStatus={ECampaignTimeLineItem.PROCESSING}
					title="Initiate Campaign"
					description="The campaign is being initiated"
					status={'to-do'}
				/>

				<CampaignTimeLineItem
					iconStatus={ECampaignTimeLineItem.CHECKED}
					title="Campaign Draft"
					description="The campaign draft has been finalized and saved"
					date={campaign.collateralStatus?.date}
					status={'success'}
					isFirst
				/>
			</div>
		</div>
		<Divider />
		<div class="flex flex-row justify-between gap-8">
			<Button styleVariant={EButtonStyleVariant.SECONDARY}>Delete</Button>
			<Button on:click={openModal.bind(null, { variant: EModalVariant.CAMPAIGN_INITIATE })}
				>Initiate</Button
			>
		</div>
	</div>
</div>

<style lang="less">
	.campaign-list-item-container {
		display: flex;
		flex-direction: column;
		width: 100%;

		border: 1px solid #272727;
		background: #1b1b1b;
		border-radius: 4px;

		.header {
			padding: 16px;
			border-bottom: 1px solid #272727;
			cursor: pointer;

			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		.content {
			display: flex;
			flex-direction: column;
			padding: 16px;
			gap: 16px;
		}
	}
</style>
