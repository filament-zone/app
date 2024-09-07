<script lang="ts">
	import { Container, Input, Toggle, Typography } from '$lib/components';
	import { EInputSizeVariant, type IToggleProps } from '$lib/types';

	let tableToggleOptions: IToggleProps<string>['options'] = [
		{ value: 'public', label: 'Public' },
		{ value: 'hidden', label: 'Hidden' }
	];

	let tableToggleOptions2: IToggleProps<string>['options'] = [
		{ value: 'internal', label: 'Internal' },
		{ value: 'external', label: 'External' }
	];
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
				<Toggle label="Visibility" options={tableToggleOptions} />
				<Input label="Relative share*" placeholder="10%" sizeVariant={EInputSizeVariant.SMALL} />
				<Input
					label="Total Supply*"
					placeholder="100,000,000"
					sizeVariant={EInputSizeVariant.SMALL}
				/>
				<Input
					label="Token Contract Address (if available)"
					placeholder="0x6982508145454Ce325dDbE47a25d4ec3d2311933"
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
			<div class="flex flex-row gap-4">
				<Toggle label="Indexer" options={tableToggleOptions2} />
				<div class="flex flex-row gap-4">
					<Input label="Budget" placeholder="10%" sizeVariant={EInputSizeVariant.SMALL} />
					<Input labelGap placeholder="100,000,000" sizeVariant={EInputSizeVariant.SMALL} />
				</div>
			</div>
		</div>
	</Container>
	<Container label="Campaign Collateral">
		<div class="flex flex-col gap-5">
			<Typography variant="caption">
				To prevent campaign spam and facilitate the participation of all delegates in the
				administration, the Filament hub requires you to deposit a collateral. If the campaign runs
				smoothly, you will be able to redeem the collaterial bond at no cost. In case you cancel the
				campaign before finalization a fee is deducted from the bond to pay the involved servies of
				the Filament Hub. The fee is determined algorithmically by the protocol, depending on the
				number of campaigns.
			</Typography>
			<Input placeholder="50,000" sizeVariant={EInputSizeVariant.SMALL} />
		</div></Container
	>
</div>
