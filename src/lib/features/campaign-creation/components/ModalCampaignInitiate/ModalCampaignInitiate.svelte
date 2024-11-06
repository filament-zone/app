<script lang="ts">
	import { writable } from 'svelte/store';
	import { Modal, modalStore, PricingComponent } from '$lib/features';
	import { Button, Typography } from '$lib/components';
	import type { IDropdownProps } from '$lib/types';

	const { closeModal } = modalStore;

	const campaignInitiateState = writable({
		isPayNow: {
			selected: true,
			quantity: 40000,
			token: 'usdt'
		},
		isBond: {
			selected: false,
			quantity: 40000,
			token: 'bFila'
		}
	});

	const togglePayNow = () => {
		campaignInitiateState.update((state) => {
			state.isPayNow.selected = true;
			state.isBond.selected = false;
			return state;
		});
	};

	const toggleBond = () => {
		campaignInitiateState.update((state) => {
			state.isPayNow.selected = false;
			state.isBond.selected = true;
			return state;
		});
	};

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
		<PricingComponent
			class="mt-8"
			label="Pay Now"
			requiredLabel={dropdownOptionsPayNow.find(
				(option) => option.value === $campaignInitiateState.isPayNow.token
			)?.label}
			isActive={$campaignInitiateState.isPayNow.selected}
			on:click={togglePayNow}
			bind:dropdownValue={$campaignInitiateState.isPayNow.token}
			dropdownOptions={dropdownOptionsPayNow}
		/>
		<div class="divider">
			<Typography variant="subtitle2">or</Typography>
		</div>
		<PricingComponent
			label="Deposit Bond"
			requiredLabel={dropdownOptionsBond.find(
				(option) => option.value === $campaignInitiateState.isBond.token
			)?.label}
			isActive={$campaignInitiateState.isBond.selected}
			on:click={toggleBond}
			bind:dropdownValue={$campaignInitiateState.isBond.token}
			dropdownOptions={dropdownOptionsBond}
		/>
		<Button on:click={closeModal} class="ml-auto mt-8" variant="secondary">Initiate Campaign</Button
		>
	</div>
</Modal>

<style lang="less">
	.divider {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin: 20px 0;
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid #ffffff;
		margin: 0 10px;
	}
</style>
