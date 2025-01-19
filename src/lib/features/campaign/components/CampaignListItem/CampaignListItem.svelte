<script lang="ts">
	import { goto } from '$app/navigation';
	import { CampaignTimeLine, Typography } from '$lib/components';
	import { routes } from '$lib/constants';
	import { replaceUrlParams } from '$lib/helpers';
	import { type ICampaignListItemProps } from '$lib/types';
	import { MaximizeIcon } from 'svelte-feather-icons';

	export let campaign: ICampaignListItemProps['campaign'];

	const handleOpenCampaignDetails = () => {
		goto(
			replaceUrlParams(routes.CAMPAIGNS.CAMPAIGN_ID.ROOT, {
				campaignId: campaign.id.toString()
			})
		);
	};
</script>

<button on:click={handleOpenCampaignDetails}>
	<div class="campaign-list-item-container">
		<div class="header">
			<Typography variant="h4">{campaign.title}</Typography>
			<div
				class="flex flex-row items-center justify-center text-foreground hover:text-filaMint cursor-pointer border border-1 h-8 w-8"
			>
				<button on:click={handleOpenCampaignDetails}>
					<MaximizeIcon strokeWidth={2} class="w-5 h-5" />
				</button>
			</div>
		</div>
		<div class="content">
			{#if campaign}
				<CampaignTimeLine {campaign} label="Phase" isCollapsable={false} />
			{/if}
		</div>
	</div>
</button>

<style lang="less">
	.campaign-list-item-container {
		display: flex;
		flex-direction: column;
		width: 100%;

		border: 1px solid #272727;
		background: var(--background-300);
		border-radius: 4px;

		&:hover {
			background: var(--highlight-bg);
		}

		.header {
			padding: 16px;
			border-bottom: 1px solid #272727;
			cursor: pointer;

			display: flex;
			flex-direction: row;
			justify-content: space-between;

			button {
				background: transparent;
				border: none;
				color: var(--accentColor);
				cursor: pointer;
			}
		}

		.content {
			display: flex;
			flex-direction: column;
			padding: 16px;
			gap: 16px;
		}
	}
</style>
