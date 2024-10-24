<script lang="ts">
	import moment from 'moment/moment.js';
	import { campaignStore, CampaignTimeLineItem } from '$lib/features';
	import { Badge, Button, Divider, Typography } from '$lib/components';
	import {
		type ICampaignListItemProps,
		EButtonColorVariant,
		ECampaignTimeLineItem
	} from '$lib/types';

	export let campaign: ICampaignListItemProps['campaign'];

	const { initiateCampaign } = campaignStore;
</script>

<div class="campaign-list-item-container">
	<div class="header">
		<Typography variant="h4">{campaign.title}</Typography>
	</div>
	<div class="content">
		<div class="flex flex-row justify-between">
			<div class="flex flex-col">
				<Typography variant="h6">Status</Typography>
				<Badge label="READY" />
			</div>
			<div class="flex flex-col w-auto">
				<Typography variant="h6">Collateral</Typography>
				<div class="flex flex-row w-[250px] gap-8">
					<div>
						<Typography variant="h6" color="var(--filaMint)" class="text-nowrap"
							>50,000 FILA</Typography
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
					title="Deposit Collateral"
					description="In order to initiate the campaign you have to deposit the campaign collateral."
					status={campaign.collateralStatus?.status}
					isLast
				/>
				<CampaignTimeLineItem
					iconStatus={ECampaignTimeLineItem.CHECKED}
					title="Signed Deposit Transaction"
					description="The campaign draft has been finalized and saved"
					date={campaign.collateralStatus?.date}
					status={'success'}
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
			<Button colorVariant={EButtonColorVariant.SECONDARY}>Delete</Button>
			<Button
				colorVariant={EButtonColorVariant.PRIMARY}
				on:click={initiateCampaign.bind(null, campaign)}>Initiate</Button
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
		}

		.content {
			display: flex;
			flex-direction: column;
			padding: 16px;
			gap: 16px;
		}
	}
</style>
