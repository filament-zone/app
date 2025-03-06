<script lang="ts">
	import { writable } from 'svelte/store';
	import { initiateCampaignStore, Modal, modalStore, TxTimeLineItem } from '$lib/features';
	import { Button, Typography } from '$lib/components';
	import { type ITxTimeLineItemProps, ETxTimeLineItem, EButtonStyleVariant } from '$lib/types';

	const { closeModal } = modalStore;
	const { signTokenAllowance, signDepositTransaction, hubConfirm } = initiateCampaignStore;

	const step = writable<number>(1);

	const timeLineItemSignTokenAllowanceProps = {
		title: 'Sign Token Allowance',
		description: 'Please allow us to requirest at least 50,000 FILA',
		buttonLabel: 'Sign',
		isFirst: true,
		phase: '1'
	};

	const timeLineItemSignDepositTransactionProps = {
		title: 'Sign Deposit Transaction',
		description: 'Send the funds to our mainnet contracts',
		buttonLabel: 'Sign',
		phase: '2'
	};

	const timeLineItemFilamentHubConfirmationProps = {
		iconStatus: ETxTimeLineItem.PROCESSING,
		title: 'Filament Hub Confirmation',
		description: 'Confirm',
		buttonLabel: 'Confirm',
		phase: '3'
	};

	const modalConfig: Record<
		number,
		{
			timeLineItemSignTokenAllowanceProps: ITxTimeLineItemProps;
			timeLineItemSignDepositTransactionProps: ITxTimeLineItemProps;
			timeLineItemFilamentHubConfirmationProps: ITxTimeLineItemProps;
		}
	> = {
		1: {
			timeLineItemSignTokenAllowanceProps: {
				...timeLineItemSignTokenAllowanceProps,
				iconStatus: ETxTimeLineItem.PROCESSING,
				status: 'to-do',
				onButtonClick: () => {
					signTokenAllowance();
					step.set(2);
				}
			},
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'to-do',
				iconStatus: ETxTimeLineItem.PROCESSING
			},
			timeLineItemFilamentHubConfirmationProps: {
				...timeLineItemFilamentHubConfirmationProps,
				status: 'to-do',
				isLast: true
			}
		},
		2: {
			timeLineItemSignTokenAllowanceProps: {
				...timeLineItemSignTokenAllowanceProps,
				iconStatus: ETxTimeLineItem.CHECKED,
				status: 'success'
			},
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'to-do',
				iconStatus: ETxTimeLineItem.PROCESSING,
				onButtonClick: () => {
					signDepositTransaction();
					step.set(3);
				}
			},
			timeLineItemFilamentHubConfirmationProps: {
				...timeLineItemFilamentHubConfirmationProps,
				status: 'to-do',
				iconStatus: ETxTimeLineItem.PROCESSING
			}
		},
		3: {
			timeLineItemSignTokenAllowanceProps: {
				...timeLineItemSignTokenAllowanceProps,
				iconStatus: ETxTimeLineItem.CHECKED,
				status: 'success'
			},
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'success',
				iconStatus: ETxTimeLineItem.CHECKED
			},
			timeLineItemFilamentHubConfirmationProps: {
				...timeLineItemFilamentHubConfirmationProps,
				status: 'to-do',
				iconStatus: ETxTimeLineItem.PROCESSING,
				onButtonClick: () => {
					hubConfirm();
					step.set(4);
				}
			}
		},
		4: {
			timeLineItemSignTokenAllowanceProps: {
				...timeLineItemSignTokenAllowanceProps,
				iconStatus: ETxTimeLineItem.CHECKED,
				status: 'success'
			},
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'success',
				iconStatus: ETxTimeLineItem.CHECKED
			},
			timeLineItemFilamentHubConfirmationProps: {
				...timeLineItemFilamentHubConfirmationProps,
				status: 'processing',
				iconStatus: ETxTimeLineItem.PROCESSING,
				description: 'This can take up to 10 minutes. You can close the window in the meantime.',
				isLast: true
			}
		}
	};
</script>

<Modal classNames="max-w-96" closeOnClickOutside={false}>
	{#snippet header()}
		<div>
			<Typography variant="h5">Deposit Campaign Collateral</Typography>
		</div>
	{/snippet}
	{#snippet content()}
		<div>
			<div>
				<TxTimeLineItem {...modalConfig[$step].timeLineItemFilamentHubConfirmationProps} />
				<TxTimeLineItem {...modalConfig[$step].timeLineItemSignDepositTransactionProps} />
				<TxTimeLineItem {...modalConfig[$step].timeLineItemSignTokenAllowanceProps} />
			</div>
			<Button class="ml-auto mt-8" styleVariant={EButtonStyleVariant.SECONDARY} onclick={closeModal}
				>Close</Button
			>
		</div>
	{/snippet}
</Modal>
