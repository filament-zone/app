<script lang="ts">
	import { goto } from '$app/navigation';
	import { CampaignListItem } from '$lib/features';
	import { Button, Container, Toggle, Typography } from '$lib/components';
	import { routes } from '$lib/constants';
	import { replaceUrlParams } from '$lib/helpers';
	import { EToggleVariant } from '$lib/types';

	export let data;

	$: toggleValue = 'all';
</script>

<Container label="Airdrops list">
	<div slot="header">
		<Button
			on:click={() => {
				goto(
					replaceUrlParams(routes.CAMPAIGNS.MANAGE.CREATE.ROOT, {
						campaignType: 'air-drop',
						step: '1'
					})
				);
			}}
		>
			Create
		</Button>
	</div>
	{#if data.campaignList.length === 0}
		<Typography class="text-center" variant="h4">No campaigns found</Typography>
	{:else}
		<div class="flex flex-col w-full">
			<div class="flex justify-between gap-8 w-full mb-4">
				<Toggle
					options={data.campaignToggleOptions}
					variant={EToggleVariant.SECONDARY}
					bind:value={toggleValue}
				/>
			</div>
			<div class="flex flex-col gap-4 w-full">
				{#each data.campaignList as campaignItem}
					<CampaignListItem campaign={campaignItem} />
				{/each}
			</div>
		</div>
	{/if}
</Container>
