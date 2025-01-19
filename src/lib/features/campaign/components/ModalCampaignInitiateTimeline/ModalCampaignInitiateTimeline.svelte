<script lang="ts">
	import { writable } from 'svelte/store';
	import { initiateCampaignStore, Modal, modalStore } from '$lib/features';
	import { Button, Typography, TimeLineItem } from '$lib/components';
	import { type ITimeLineItemProps, ETimeLineItem } from '$lib/types';

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
		iconStatus: ETimeLineItem.PROCESSING,
		title: 'Filament Hub Confirmation',
		description: 'Confirm',
		buttonLabel: 'Confirm',
		phase: '3'
	};

	const modalConfig: Record<
		number,
		{
			timeLineItemSignTokenAllowanceProps: ITimeLineItemProps;
			timeLineItemSignDepositTransactionProps: ITimeLineItemProps;
			timeLineItemFilamentHubConfirmationProps: ITimeLineItemProps;
		}
	> = {
		1: {
			timeLineItemSignTokenAllowanceProps: {
				...timeLineItemSignTokenAllowanceProps,
				iconStatus: ETimeLineItem.PROCESSING,
				status: 'to-do',
				onButtonClick: () => {
					signTokenAllowance();
					step.set(2);
				}
			},
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'to-do',
				iconStatus: ETimeLineItem.PROCESSING
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
				iconStatus: ETimeLineItem.CHECKED,
				status: 'success'
			},
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'to-do',
				iconStatus: ETimeLineItem.PROCESSING,
				onButtonClick: () => {
					signDepositTransaction();
					step.set(3);
				}
			},
			timeLineItemFilamentHubConfirmationProps: {
				...timeLineItemFilamentHubConfirmationProps,
				status: 'to-do',
				iconStatus: ETimeLineItem.PROCESSING
			}
		},
		3: {
			timeLineItemSignTokenAllowanceProps: {
				...timeLineItemSignTokenAllowanceProps,
				iconStatus: ETimeLineItem.CHECKED,
				status: 'success'
			},
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'success',
				iconStatus: ETimeLineItem.CHECKED
			},
			timeLineItemFilamentHubConfirmationProps: {
				...timeLineItemFilamentHubConfirmationProps,
				status: 'to-do',
				iconStatus: ETimeLineItem.PROCESSING,
				onButtonClick: () => {
					hubConfirm();
					step.set(4);
				}
			}
		},
		4: {
			timeLineItemSignTokenAllowanceProps: {
				...timeLineItemSignTokenAllowanceProps,
				iconStatus: ETimeLineItem.CHECKED,
				status: 'success'
			},
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'success',
				iconStatus: ETimeLineItem.CHECKED
			},
			timeLineItemFilamentHubConfirmationProps: {
				...timeLineItemFilamentHubConfirmationProps,
				status: 'processing',
				iconStatus: ETimeLineItem.PROCESSING,
				description: 'This can take up to 10 minutes. You can close the window in the meantime.',
				isLast: true
			}
		}
	};
</script>

<Modal classNames="max-w-96" closeOnClickOutside={false}>
	<div slot="header">
		<Typography variant="h5">Deposit Campaign Collateral</Typography>
	</div>
	<div slot="content">
		<div>
			<TimeLineItem {...modalConfig[$step].timeLineItemFilamentHubConfirmationProps} />
			<TimeLineItem {...modalConfig[$step].timeLineItemSignDepositTransactionProps} />
			<TimeLineItem {...modalConfig[$step].timeLineItemSignTokenAllowanceProps} />
		</div>
		<Button class="ml-auto mt-8" variant="secondary" on:click={closeModal}>Close</Button>
	</div>
</Modal>
