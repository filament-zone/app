<script lang="ts">
	import { onMount } from 'svelte';
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';
	import { campaignStore } from '$lib/features';
	import { Container, Input, Toggle, Typography } from '$lib/components';
	import { EInputSizeVariant, EToggleSizeVariant } from '$lib/types';
	import ArrowRight from '$lib/assets/icons/arrow-right.svg?component';

	const data = derived(page, () => $page.data);
	const { campaignDetails } = campaignStore;

	onMount(() => {
		campaignDetails.update((prev) => ({
			...prev,
			visibility: $data.step3Data.visibility,
			relativeShare: $data.step3Data.relativeShare,
			totalAirDropSupply: $data.step3Data.totalAirDropSupply,
			tokenContractAddress: $data.step3Data.tokenContractAddress,
			indexer: $data.step3Data.indexer,
			budgetFrom: $data.step3Data.budgetFrom,
			budgetTo: $data.step3Data.budgetTo,
			bond: $data.step3Data.bond
		}));
	});
</script>

<div class="flex flex-col gap-5">
	<Container label="Token Budget">
		<div class="flex flex-col gap-5">
			<Typography variant="caption"
				>Please define the amount of token that you would like to distribute to the airdrop
				recipients. You can decide whether this information should be public right away or hidden
				until the criteria voting has ended.
			</Typography>
			<div class="flex flex-row justify-between gap-4">
				<Toggle
					label="Visibility"
					bind:value={$campaignDetails.visibility}
					options={$data.step3Data.meta.visibilityOptions}
					sizeVariant={EToggleSizeVariant.NORMAL}
				/>
				<Input
					label="Relative share*"
					bind:value={$campaignDetails.relativeShare}
					placeholder="Type here..."
					sizeVariant={EInputSizeVariant.SMALL}
					LeftIcon="~"
					RightIcon="%"
					textColor="var(--filaMint)"
				/>
				<Input
					label="Total Supply*"
					bind:value={$campaignDetails.totalAirDropSupply}
					placeholder="Type here..."
					sizeVariant={EInputSizeVariant.SMALL}
				/>
				<Input
					label="Token Contract Address (if available)"
					bind:value={$campaignDetails.tokenContractAddress}
					placeholder="Type here..."
					sizeVariant={EInputSizeVariant.MEDIUM}
				/>
			</div>
		</div>
	</Container>
	<Container label="Indexer">
		<div class="flex flex-col gap-5">
			<Typography variant="caption">
				Indexers will compete on the Filament Hub to process the required point system based on the
				criteria and weights you have defined on the previous page. Depending on the complexity of
				your airdrop criteria the Hub automatically determines a fair budget for Indexers. By
				selecting an internal Indexer you can outsource this process and negotiate freely. We
				recommend to rely on trusted Indexers.
			</Typography>
			<div class="flex flex-row gap-4 justify-between">
				<Toggle
					label="Indexer"
					bind:value={$campaignDetails.indexer}
					options={$data.step3Data.meta.indexerOptions}
					sizeVariant={EToggleSizeVariant.NORMAL}
				/>
				<div class="flex flex-row gap-4">
					<Input
						label="Budget"
						bind:value={$campaignDetails.budgetFrom}
						placeholder="Type here..."
						sizeVariant={EInputSizeVariant.MEDIUM}
						RightIcon="FILA"
						textColor="var(--filaMint)"
					/>
					<ArrowRight class="mt-[43px]" />
					<Input
						labelGap
						bind:value={$campaignDetails.budgetTo}
						placeholder="Type here..."
						sizeVariant={EInputSizeVariant.MEDIUM}
						LeftIcon="$"
					/>
				</div>
			</div>
		</div>
	</Container>
	<Container label="Campaign Collateral">
		<div class="flex flex-col gap-5">
			<Typography variant="caption">
				To prevent campaign spam and facilitate the participation of all governance in the
				administration, the Filament hub requires you to deposit a collateral. If the campaign runs
				smoothly, you will be able to redeem the collaterial bond at no cost. In case you cancel the
				campaign before finalization a fee is deducted from the bond to pay the involved servies of
				the Filament Hub. The fee is determined algorithmically by the protocol, depending on the
				number of campaigns.
			</Typography>
			<Input
				placeholder="Type here..."
				bind:value={$campaignDetails.bond}
				sizeVariant={EInputSizeVariant.MEDIUM}
				LeftIcon="Bond"
				RightIcon="FILA"
				textColor="var(--filaMint)"
			/>
		</div></Container
	>
</div>
