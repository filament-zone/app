<!-- @migration-task Error while migrating Svelte code: `<button>` cannot be a descendant of `<button>`. The browser will 'repair' the HTML (by moving, removing, or inserting elements) which breaks Svelte's assumptions about the structure of your components.
https://svelte.dev/e/node_invalid_placement -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { CampaignTimeLine, Typography } from '$lib/components';
	import { routes } from '$lib/constants';
	import { replaceUrlParams } from '$lib/helpers';
	import { type ICampaignListItemProps } from '$lib/types';
	import { ArrowUpRightIcon } from 'svelte-feather-icons';
	import moment from 'moment';
	export let campaign: ICampaignListItemProps['campaign'];
	const showCreatedAt = false;

	const handleOpenCampaignDetails = () => {
		goto(
			replaceUrlParams(routes.CAMPAIGNS.CAMPAIGN_ID.ROOT, {
				campaignId: campaign.id.toString()
			})
		);
	};
</script>

<button onclick={handleOpenCampaignDetails}>
	<div class="campaign-list-item-container">
		<div class="header">
			<Typography variant="h4">{campaign.title}</Typography>
			<div class="icon-button">
				<ArrowUpRightIcon strokeWidth={3} class="w-5 h-5" />
			</div>
		</div>
		<div class="content">
			{#if campaign}
				<CampaignTimeLine {campaign} label="Phase" isCollapsable={false} />
			{/if}
		</div>
		<div class="flex flex-row p-2 opacity-50 justify-end px-4">
			{#if showCreatedAt && campaign.createdAt}
				<Typography variant="labelSmall"
					>published {moment(campaign.createdAt.toLocaleString()).format(
						'MMMM D, YYYY'
					)}</Typography
				>
			{/if}
		</div>
	</div>
</button>

<style lang="less">
	.icon-button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		color: var(--foreground);

		cursor: pointer;
		height: 32px;
		width: 32px;
	}

	.campaign-list-item-container {
		display: flex;
		flex-direction: column;
		width: 100%;

		border: 1px solid #272727;
		background: var(--background-300);
		border-radius: 4px;

		&:hover {
			border-color: var(--filaMint);

			.icon-button {
				color: var(--filaMint);
			}
		}

		.header {
			padding: 16px;
			padding-bottom: 0;
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
			padding: 12px;
			gap: 16px;
		}
	}
</style>
