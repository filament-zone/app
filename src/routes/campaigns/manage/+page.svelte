<script lang="ts">
	import { goto } from '$app/navigation';
	import { CampaignListItem, isCampaignOwner, walletStore } from '$lib/features';
	import { Button, Container, Toggle, Typography, Pagination } from '$lib/components';
	import { replaceUrlParams } from '$lib/helpers';
	import { routes } from '$lib/constants';
	import { EToggleVariant, EWalletProvider, EButtonStyleVariant } from '$lib/types';

	export let data;

	const { wallet, initializeWallet } = walletStore;

	$: toggleValue = 'all';

	$: filterCampaigns = () => {
		switch (toggleValue) {
			case 'all':
				return data.campaignList;
			case 'myCampaigns':
				return data.campaignList?.filter((item) =>
					isCampaignOwner(item.campaigner, $wallet.address as string)
				);
			default:
				return [];
		}
	};

	$: filteredCampaigns = filterCampaigns();
</script>

<div class="flex relative w-full max-w-[1440px]">
	<Toggle
		options={data.campaignToggleOptions}
		variant={EToggleVariant.SECONDARY}
		bind:value={toggleValue}
	/>
	<Pagination />
</div>

<Container variant="secondary">
	<div class="flex flex-col w-full min-h-[200px] h-full items-center">
		{#if filteredCampaigns?.length}
			<div class="flex flex-col gap-4 w-full">
				{#each filteredCampaigns as campaign}
					<CampaignListItem {campaign} />
				{/each}
			</div>
		{:else}
			<div class="flex flex-col justify-center h-full min-h-[200px]">
				{#if toggleValue === 'myCampaigns'}
					{#if !$wallet.address}
						<Button on:click={initializeWallet.bind(null, EWalletProvider.METAMASK)}
							>Connect your wallet</Button
						>
					{:else}
						<Button
							on:click={() => {
								goto(
									replaceUrlParams(routes.CAMPAIGNS.MANAGE.CREATE.ROOT, {
										campaignType: 'air-drop',
										step: '1'
									})
								);
							}}
							styleVariant={EButtonStyleVariant.HIGHLIGHT}
						>
							New Campaign
						</Button>
					{/if}
				{:else}
					<Typography class="text-center" variant="h4">No campaigns found</Typography>
				{/if}
			</div>
		{/if}
	</div>
</Container>

<div class="flex justify-end">
	<Pagination />
</div>
