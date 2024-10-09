<script lang="ts">
	import { writable } from 'svelte/store';
	import { CampaignTimeLineItem, Modal, modalStore } from '$lib/features';
	import { Button, Typography } from '$lib/components';
	import { ECampaignTimeLineItem, type ICampaignTimeLineItemProps } from '$lib/types';

	const { closeModal } = modalStore;

	const step = writable<number>(1);

	const timeLineItemSignTokenAllowanceProps = {
		iconStatus: ECampaignTimeLineItem.CHECKED,
		title: 'Sign Token Allowance',
		description: 'Please allow us to requirest at least 50,000 FILA',
		date: new Date().getDate().toString(),
		status: 'success'
	};

	const timeLineItemSignDepositTransactionProps = {
		title: 'Sign Deposit Transaction',
		description: 'Send the funds to our mainnet contracts',
		date: ''
	};

	const modalConfig: Record<
		number,
		{
			buttonLabel: string;
			handleFoo: () => void;
			timeLineItemSignTokenAllowanceProps: ICampaignTimeLineItemProps | null;
			timeLineItemSignDepositTransactionProps: ICampaignTimeLineItemProps | null;
			timeLineItemFilamentHubConfirmationProps: ICampaignTimeLineItemProps | null;
		}
	> = {
		1: {
			buttonLabel: 'Deposit',
			handleFoo: () => {
				console.log('foo');
				step.set(2);
			},
			timeLineItemSignTokenAllowanceProps,
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'To-Do',
				iconStatus: ECampaignTimeLineItem.PROCESSING
			},
			timeLineItemFilamentHubConfirmationProps: null
		},
		2: {
			buttonLabel: 'Close',
			handleFoo: () => {
				console.log('foo 2');
				closeModal();
			},
			timeLineItemSignTokenAllowanceProps,
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'success',
				date: new Date().getDate().toString(),
				iconStatus: ECampaignTimeLineItem.CHECKED
			},
			timeLineItemFilamentHubConfirmationProps: {
				iconStatus: ECampaignTimeLineItem.PROCESSING,
				title: 'Filament Hub Confirmation',
				description: 'This can take up to 10 minutes. You can close the window in the meantime.',
				date: '',
				status: 'To-Do'
			}
		}
	};
</script>

<Modal classNames="max-w-96" closeOnClickOutside>
	<div slot="header" class="text-center">
		<Typography variant="h2">Deposit Campaign Collateral</Typography>
	</div>
	<div slot="content">
		<div>
			{#if $step === 2}
				<CampaignTimeLineItem {...modalConfig[$step].timeLineItemFilamentHubConfirmationProps} />
			{/if}
			<CampaignTimeLineItem {...modalConfig[$step].timeLineItemSignDepositTransactionProps} />
			<CampaignTimeLineItem {...modalConfig[$step].timeLineItemSignTokenAllowanceProps} />
		</div>
		<Button class="ml-auto mt-8" variant="secondary" on:click={modalConfig[$step].handleFoo}
			>{modalConfig[$step].buttonLabel}</Button
		>
	</div>
</Modal>
