<script lang="ts">
	import { page } from '$app/state';
	import { campaignStore } from '$lib/features';
	import { Container, Input, Toggle, Typography } from '$lib/components';
	import { EInputSizeVariant, EToggleSizeVariant } from '$lib/types';

	const { campaignDetails } = campaignStore;
</script>

<div class="flex flex-col gap-5">
	<Container label="Token Budget" variant="secondary">
		<div class="flex flex-col gap-5">
			<Typography variant="caption"
				>Please define the amount of token that you would like to distribute to the airdrop
				recipients. You can decide whether this information should be public right away or hidden
				until the criteria voting has ended.
			</Typography>
			<Container variant="inner-container">
				<div class="flex flex-row justify-between gap-4">
					<Toggle
						label="Visibility"
						bind:value={$campaignDetails.visibility}
						options={page.data.pageData.step3Data.meta.visibilityOptions}
						sizeVariant={EToggleSizeVariant.NORMAL}
					/>
					<Input
						label="Relative share*"
						bind:value={$campaignDetails.relativeShare}
						placeholder="Type here..."
						sizeVariant={EInputSizeVariant.SMALL}
						LeftContent="~"
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
			</Container>
		</div>
	</Container>
	<Container label="Indexer" variant="secondary">
		<div class="flex flex-col gap-5">
			<Typography variant="caption">
				The Indexer price is calculated by the Filament Hub based on the complexity of your selected
				snapshot schedule and eligibility criteria.
			</Typography>
			<Container variant="inner-container">
				<div class="flex flex-row gap-4">
					<Input
						label="Price"
						bind:value={$campaignDetails.indexerPrice}
						placeholder="Type here..."
						sizeVariant={EInputSizeVariant.MEDIUM}
						LeftContent="#"
						RightIcon="FILA"
						textColor="var(--filaMint)"
						disabled={true}
					/>
					<div class="flex gap-2 items-end pb-2">
						<p class="text-2xl">~</p>
					</div>
					<Input
						labelGap
						bind:value={$campaignDetails.indexerPriceUSD}
						placeholder="Type here..."
						sizeVariant={EInputSizeVariant.MEDIUM}
						LeftContent="$"
						RightIcon="USD"
						disabled={true}
					/>
				</div>
			</Container>
		</div>
	</Container>
	<Container label="Campaign Collateral" variant="secondary">
		<div class="flex flex-col gap-5">
			<Typography variant="caption">
				To prevent campaign spam and facilitate the participation of all governance in the
				administration, the Filament hub requires you to deposit a collateral. If the campaign runs
				smoothly, you will be able to redeem the collaterial bond at no cost. In case you cancel the
				campaign before finalization a fee is deducted from the bond to pay the involved servies of
				the Filament Hub. The fee is determined algorithmically by the protocol, depending on the
				number of campaigns.
			</Typography>
			<Container variant="inner-container">
				<div class="flex flex-row gap-4 items-end">
					<Input
						label="Required Collateral"
						placeholder="Type here..."
						bind:value={$campaignDetails.bond}
						sizeVariant={EInputSizeVariant.MEDIUM}
						LeftContent="#"
						RightIcon="BOND"
						textColor="var(--filaMint)"
						disabled={true}
					/>
					<div class="flex gap-2 items-end pb-2">
						<p class="text-2xl">~</p>
					</div>
					<Input
						label=""
						bind:value={$campaignDetails.indexerPrice}
						placeholder="Type here..."
						sizeVariant={EInputSizeVariant.MEDIUM}
						LeftContent="#"
						RightIcon="FILA"
						textColor="var(--filaMint)"
						disabled={true}
					/>
					<div class="flex gap-2 items-end pb-2">
						<p class="text-2xl">~</p>
					</div>
					<Input
						labelGap
						bind:value={$campaignDetails.indexerPriceUSD}
						placeholder="Type here..."
						sizeVariant={EInputSizeVariant.MEDIUM}
						LeftContent="$"
						RightIcon="USD"
						disabled={true}
					/>
				</div>
			</Container>
		</div></Container
	>
</div>
