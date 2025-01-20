<script lang="ts">
	import { CampaignListItem, isCampaignOwner, walletStore } from '$lib/features';
	import { Button, Container, Toggle, Typography, Pagination } from '$lib/components';
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

	$: containerClass = 'flex flex-col gap-4 w-full';

	let currentPage = 1;
	const itemsPerPage = 5;

	const paginatedCampaigns = () => {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return filteredCampaigns.slice(start, end);
	};

	const handlePageChange = (page: number) => {
		currentPage = page;
	};
</script>

<div class="flex relative w-full max-w-[1440px]">
	<Toggle
		options={data.campaignToggleOptions}
		variant={EToggleVariant.SECONDARY}
		bind:value={toggleValue}
	/>

	<Pagination
		pagination={{ totalPages: Math.ceil(filteredCampaigns.length / itemsPerPage), currentPage }}
		onPageChange={handlePageChange}
	/>

	<!-- 
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
					New Campaign
				</Button> -->
</div>

<Container variant="secondary">
	<div class="flex flex-col w-full min-h-[200px] h-full items-center">
		{#if filteredCampaigns?.length}
			<div class={containerClass}>
				{#each paginatedCampaigns() as campaign}
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

<div class="flex justify-end">
	<Pagination
		pagination={{ totalPages: Math.ceil(filteredCampaigns.length / itemsPerPage), currentPage }}
		onPageChange={handlePageChange}
	/>
</div>
