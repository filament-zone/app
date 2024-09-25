<script lang="ts">
	import moment from 'moment/moment.js';
	import { Badge, Button, Divider, Typography } from '$lib/components';
	import { type ICampaignListItemProps, EButtonColorVariant } from '$lib/types';

	export let campaign: ICampaignListItemProps['campaign'];
</script>

<div class="campaign-list-item-container">
	<div class="header">
		<Typography>{campaign.title}</Typography>
	</div>
	<div class="content">
		<div class="flex flex-row justify-between">
			<div class="flex flex-col">
				<Typography variant="h6">Status</Typography>
				<Badge label="Ready" />
			</div>
			<div class="flex flex-col w-auto">
				<Typography variant="h6">Collateral</Typography>
				<div class="flex flex-row w-[250px] gap-8">
					<div>
						<Typography variant="h6" color="var(--filaMint)" class="text-nowrap"
							>50,000 FILA</Typography
						>
					</div>
					<Badge label="Redeem" />
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
		</div>
		<Divider />
		<div class="flex flex-row justify-end gap-8">
			<Button colorVariant={EButtonColorVariant.BLACK}>Delete</Button>
			<Button colorVariant={EButtonColorVariant.SECONDARY}>Initiate</Button>
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
