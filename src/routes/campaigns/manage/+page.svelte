<script lang="ts">
	import { goto } from '$app/navigation';
	import { CampaignListItem, isCampaignOwner, walletStore } from '$lib/features';
	import { Button, Container, Toggle, Typography } from '$lib/components';
	import { routes } from '$lib/constants';
	import { replaceUrlParams } from '$lib/helpers';
	import { EToggleVariant, EWalletProvider } from '$lib/types';

	export let data;

	const { wallet, initializeWallet } = walletStore;

	$: toggleValue = 'all';

	$: filterCampaigns = () => {
		switch (toggleValue) {
			case 'all':
				return data.campaignList;
			case 'yourCampaigns':
				return data.campaignList?.filter((item) =>
					isCampaignOwner(item.campaigner, $wallet.address as string)
				);

			default:
				return [];
		}
	};

	$: filteredCampaigns = filterCampaigns();

	$: containerClass =
		toggleValue === 'yourCampaigns'
			? 'grid grid-cols-2 gap-4 w-full'
			: 'flex flex-col gap-4 w-full';
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

	<div class="flex flex-col w-full min-h-[200px] h-full items-center">
		<div class="flex justify-between gap-8 w-full mb-4">
			<Toggle
				options={data.campaignToggleOptions}
				variant={EToggleVariant.SECONDARY}
				bind:value={toggleValue}
			/>
		</div>
		{#if filteredCampaigns?.length}
			<div class={containerClass}>
				{#each filteredCampaigns as campaign}
					<CampaignListItem {campaign} />
				{/each}
			</div>
		{:else}
			<div class="flex flex-col justify-center h-full min-h-[200px]">
				{#if toggleValue === 'yourCampaigns'}
					<Button on:click={initializeWallet.bind(null, EWalletProvider.METAMASK)}
						>Connect your wallet</Button
					>
				{:else}
					<Typography class="text-center" variant="h4">No campaigns found</Typography>
				{/if}
			</div>{/if}
	</div>
</Container>
