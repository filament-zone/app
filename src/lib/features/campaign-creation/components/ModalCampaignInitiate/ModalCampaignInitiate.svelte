<script lang="ts">
	import { writable } from 'svelte/store';
	import { Modal, modalStore, PricingComponent } from '$lib/features';
	import { Button, ToggleContentCard, ToggleContentContainer, Typography } from '$lib/components';
	import type { IDropdownProps } from '$lib/types';
	import CheckmarkCircleIcon from '$lib/assets/icons/checkmark-circle.svg?component';

	const { closeModal } = modalStore;

	let toggleSelected = 'isFirst';

	const campaignInitiateState = writable({
		isPayNow: {
			selected: toggleSelected === 'isFirst',
			quantity: 40000,
			token: 'usdt'
		},
		isBond: {
			selected: toggleSelected === 'isSecond',
			quantity: 40000,
			token: 'bFila'
		}
	});

	const dropdownOptionsPayNow: IDropdownProps['options'] = [
		{ value: 'usdt', label: 'USDT' },
		{ value: 'fila', label: 'FILA' }
	];

	const dropdownOptionsBond: IDropdownProps['options'] = [{ value: 'bFila', label: 'bFILA' }];
</script>

<Modal classNames="max-w-96">
	<div slot="header">
		<Typography variant="h5">Initiate Campaign</Typography>
	</div>
	<div slot="content">
		<Typography variant="subtitle2"
			>To prevent campaign spam and facilitate the participation of all governance in the
			administration, the Filament hub requires campaigners to deposit a collateral bond. Campaigns
			can only be initiated if a collateral has been deposited.
		</Typography>
		<br />
		<Typography variant="subtitle2">
			The pricing is determined algorithmically by the Filament Hub.
		</Typography>

		<ToggleContentContainer bind:selected={toggleSelected}>
			<ToggleContentCard slot="first">
				<div class="flex flex-row gap-2" slot="label">
					<CheckmarkCircleIcon fill="var(--upOnly-400)" />
					<Typography variant="caption" slot="label">Pay Now</Typography>
				</div>
				<PricingComponent
					slot="content"
					requiredLabel={dropdownOptionsPayNow.find(
						(option) => option.value === $campaignInitiateState.isPayNow.token
					)?.label}
					bind:dropdownValue={$campaignInitiateState.isPayNow.token}
					dropdownOptions={dropdownOptionsPayNow}
				/>
			</ToggleContentCard>
			<ToggleContentCard slot="second">
				<div class="flex flex-row gap-2" slot="label">
					<CheckmarkCircleIcon fill="var(--upOnly-400)" />
					<Typography variant="caption" slot="label">Deposit Bond</Typography>
				</div>
				<PricingComponent
					slot="content"
					requiredLabel={dropdownOptionsBond.find(
						(option) => option.value === $campaignInitiateState.isBond.token
					)?.label}
					bind:dropdownValue={$campaignInitiateState.isBond.token}
					dropdownOptions={dropdownOptionsBond}
				/>
			</ToggleContentCard>
		</ToggleContentContainer>
		<Button on:click={closeModal} class="ml-auto mt-8" variant="secondary">
			Initiate Campaign
		</Button>
	</div>
</Modal>
