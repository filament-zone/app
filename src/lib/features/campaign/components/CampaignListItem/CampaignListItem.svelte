<script lang="ts">
	import moment from 'moment/moment.js';
	import { goto } from '$app/navigation';
	import { isCampaignOwner, modalStore, walletStore } from '$lib/features';
	import { Badge, Button, CampaignTimeLine, Divider, Typography } from '$lib/components';
	import { routes } from '$lib/constants';
	import { replaceUrlParams } from '$lib/helpers';
	import { type ICampaignListItemProps, EButtonStyleVariant, EModalVariant } from '$lib/types';

	export let campaign: ICampaignListItemProps['campaign'];

	const { openModal } = modalStore;
	const { wallet } = walletStore;

	$: isOwner = isCampaignOwner(campaign?.campaigner, $wallet.address as string);

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
		{#if campaign}
			<CampaignTimeLine {campaign} />
		{/if}
		{#if isOwner}
			<Divider />
			<div class="flex flex-row justify-between gap-8">
				<Button styleVariant={EButtonStyleVariant.SECONDARY}>Delete</Button>
				<Button on:click={openModal.bind(null, { variant: EModalVariant.CAMPAIGN_INITIATE })}
					>Edit</Button
				>
			</div>
		{/if}
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
