<script lang="ts">
	import { run } from 'svelte/legacy';

	import { initiateCampaignStore, Modal, modalStore, PricingComponent } from '$lib/features';
	import { Button, ToggleContentCard, ToggleContentContainer, Typography } from '$lib/components';
	import {
		EModalVariant,
		type IDropdownProps,
		type TToggleContentContainerSelected
	} from '$lib/types';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';
	import { ECampaignInitiateSelected } from '$lib/features/campaign/stores/initiate-campaign-store/initiate-campaign-store.enums';

	const { openModal } = modalStore;
	const { campaignInitiateState } = initiateCampaignStore;

	const dropdownOptionsPayNow: IDropdownProps['options'] = [
		{ value: 'usdt', label: 'USDT' },
		{ value: 'fila', label: 'FILA' }
	];

	const dropdownOptionsBond: IDropdownProps['options'] = [{ value: 'bFila', label: 'bFILA' }];

	const handleInitiateCampaign = () => {
		openModal({ variant: EModalVariant.CAMPAIGN_DEPOSIT_TIMELINE });
	};

	const handleSelect = (value: TToggleContentContainerSelected) => {
		campaignInitiateState.update((prev) => ({
			...prev,
			selected:
				value === 'isFirst' ? ECampaignInitiateSelected.isPayNow : ECampaignInitiateSelected.isBond
		}));
	};

	let selected;
	run(() => {
		selected = (
			$campaignInitiateState.selected === ECampaignInitiateSelected.isPayNow ? 'isFirst' : 'isSecond'
		) as TToggleContentContainerSelected;
	});

	run(() => {
		handleSelect(selected);
	});
</script>

<Modal classNames="max-w-96">
	{#snippet header()}
		<div >
			<Typography variant="h5">Initiate Campaign</Typography>
		</div>
	{/snippet}
	{#snippet content()}
		<div >
			<div class="mb-6">
				<Typography variant="h6">
					To prevent campaign spam and facilitate the participation of all governance in the
					administration, the Filament hub requires campaigners to deposit a collateral bond.
					Campaigns can only be initiated if a collateral has been deposited.
				</Typography>
				<br />
				<Typography variant="h6">
					The pricing is determined algorithmically by the Filament Hub.
				</Typography>
			</div>
			<ToggleContentContainer bind:selected>
				{#snippet first()}
						<ToggleContentCard >
						{#snippet label()}
								<div class="flex flex-row gap-2" >
								<CheckmarkCircleIcon fill="var(--upOnly)" />
								{#snippet label()}
										<Typography variant="caption" >Pay Now</Typography>
									{/snippet}
							</div>
							{/snippet}
						{#snippet content()}
								<PricingComponent
								
								requiredLabel={dropdownOptionsPayNow.find(
									(option) => option.value === $campaignInitiateState.isPayNow.token
								)?.label}
								bind:dropdownValue={$campaignInitiateState.isPayNow.token}
								dropdownOptions={dropdownOptionsPayNow}
							/>
							{/snippet}
					</ToggleContentCard>
					{/snippet}
				{#snippet second()}
						<ToggleContentCard >
						{#snippet label()}
								<div class="flex flex-row gap-2" >
								<CheckmarkCircleIcon fill="var(--upOnly)" />
								{#snippet label()}
										<Typography variant="caption" >Deposit Bond</Typography>
									{/snippet}
							</div>
							{/snippet}
						{#snippet content()}
								<PricingComponent
								
								requiredLabel={dropdownOptionsBond.find(
									(option) => option.value === $campaignInitiateState.isBond.token
								)?.label}
								bind:dropdownValue={$campaignInitiateState.isBond.token}
								dropdownOptions={dropdownOptionsBond}
							/>
							{/snippet}
					</ToggleContentCard>
					{/snippet}
			</ToggleContentContainer>
			<Button on:click={handleInitiateCampaign} class="ml-auto mt-8" variant="secondary">
				Initiate Campaign
			</Button>
		</div>
	{/snippet}
</Modal>
