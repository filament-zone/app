<script lang="ts">
	import { Modal } from '$lib/features';
	import { Button, Input, Typography } from '$lib/components';
	import ArrowRight from '$lib/assets/icons/arrow-right.svg?component';
	import { EButtonStyleVariant } from '$lib/components/atoms/Button/Button.enums';
</script>

<Modal classNames="max-w-96" closeOnClickOutside>
	{#snippet header()}
		<div>
			<Typography variant="h5">Deposit Campaign Collateral</Typography>
		</div>
	{/snippet}
	{#snippet content()}
		<div>
			<Typography variant="h6">
				To prevent campaign spam and facilitate the participation of all governance in the
				administration, the Filament hub requires campaigners to deposit a collateral. <strong
					>Campaigns can only be initiated if the collateral has been deposited.</strong
				>
			</Typography>
			<br /> <br />
			<Typography variant="caption"
				>If the campaign runs smoothly, you will be able to redeem the collateral bond at no cost.
				In case you cancel the campaign before finalization a fee is deducted from the bond to pay
				the involved services of the Filament Hub.
			</Typography>
			<br /> <br />
			<Typography variant="caption"
				>The fee is determined algorithmically by the protocol, depending on how far the campaign
				process has progressed.
			</Typography>
			<div class="flex flex-row gap-2 my-8">
				<Input label="Required Collateral" value="40,000" LeftContent="FILA" RightIcon="TVL" />
				<div class="mt-[42px]">
					<ArrowRight />
				</div>
				<Input labelGap value="48,345" LeftContent="$" RightIcon="Point(s)" />
			</div>
			<Typography variant="caption">Please make sure that yous address has enough funds.</Typography
			>
			<Button class="ml-auto mt-8" styleVariant={EButtonStyleVariant.PRIMARY}
				>Set Token Allowance</Button
			>
		</div>
	{/snippet}
</Modal>
