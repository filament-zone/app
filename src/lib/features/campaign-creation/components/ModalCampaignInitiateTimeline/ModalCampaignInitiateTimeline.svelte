<script lang="ts">
	import { writable } from 'svelte/store';
	import { CampaignTimeLineItem, initiateCampaignStore, Modal, modalStore } from '$lib/features';
	import { Button, Typography } from '$lib/components';
	import { type ICampaignTimeLineItemProps } from '$lib/types';
	import { ECampaignTimeLineItem } from '$lib/features/campaign/components/CampaignListItem/components/CampaginTimeLineItem/CampaignTimeLineItem.enums';

	const { closeModal } = modalStore;
	const { signTokenAllowance, signDepositTransaction, hubConfirm } = initiateCampaignStore;

	const step = writable<number>(1);

	const timeLineItemSignTokenAllowanceProps = {
		title: 'Sign Token Allowance',
		description: 'Please allow us to requirest at least 50,000 FILA',
		buttonLabel: 'Sign',
		isFirst: true
	};

	const timeLineItemSignDepositTransactionProps = {
		title: 'Sign Deposit Transaction',
		description: 'Send the funds to our mainnet contracts',
		buttonLabel: 'Sign'
	};

	const timeLineItemFilamentHubConfirmationProps = {
		iconStatus: ECampaignTimeLineItem.PROCESSING,
		title: 'Filament Hub Confirmation',
		description: 'Confirm',
		buttonLabel: 'Confirm'
	};

	const modalConfig: Record<
		number,
		{
			timeLineItemSignTokenAllowanceProps: ICampaignTimeLineItemProps;
			timeLineItemSignDepositTransactionProps: ICampaignTimeLineItemProps;
			timeLineItemFilamentHubConfirmationProps: ICampaignTimeLineItemProps;
		}
	> = {
		1: {
			timeLineItemSignTokenAllowanceProps: {
				...timeLineItemSignTokenAllowanceProps,
				iconStatus: ECampaignTimeLineItem.PROCESSING,
				status: 'to-do',
				onButtonClick: () => {
					signTokenAllowance();
					step.set(2);
				}
			},
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'to-do',
				iconStatus: ECampaignTimeLineItem.PROCESSING
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
				iconStatus: ECampaignTimeLineItem.CHECKED,
				status: 'success'
			},
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'to-do',
				iconStatus: ECampaignTimeLineItem.PROCESSING,
				onButtonClick: () => {
					signDepositTransaction();
					step.set(3);
				}
			},
			timeLineItemFilamentHubConfirmationProps: {
				...timeLineItemFilamentHubConfirmationProps,
				status: 'to-do',
				iconStatus: ECampaignTimeLineItem.PROCESSING
			}
		},
		3: {
			timeLineItemSignTokenAllowanceProps: {
				...timeLineItemSignTokenAllowanceProps,
				iconStatus: ECampaignTimeLineItem.CHECKED,
				status: 'success'
			},
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'success',
				iconStatus: ECampaignTimeLineItem.CHECKED
			},
			timeLineItemFilamentHubConfirmationProps: {
				...timeLineItemFilamentHubConfirmationProps,
				status: 'to-do',
				iconStatus: ECampaignTimeLineItem.PROCESSING,
				onButtonClick: () => {
					hubConfirm();
					step.set(4);
				}
			}
		},
		4: {
			timeLineItemSignTokenAllowanceProps: {
				...timeLineItemSignTokenAllowanceProps,
				iconStatus: ECampaignTimeLineItem.CHECKED,
				status: 'success'
			},
			timeLineItemSignDepositTransactionProps: {
				...timeLineItemSignDepositTransactionProps,
				status: 'success',
				iconStatus: ECampaignTimeLineItem.CHECKED
			},
			timeLineItemFilamentHubConfirmationProps: {
				...timeLineItemFilamentHubConfirmationProps,
				status: 'processing',
				iconStatus: ECampaignTimeLineItem.PROCESSING,
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
			<CampaignTimeLineItem {...modalConfig[$step].timeLineItemFilamentHubConfirmationProps} />
			<CampaignTimeLineItem {...modalConfig[$step].timeLineItemSignDepositTransactionProps} />
			<CampaignTimeLineItem {...modalConfig[$step].timeLineItemSignTokenAllowanceProps} />
		</div>
		<Button class="ml-auto mt-8" variant="secondary" on:click={closeModal}>Close</Button>
	</div>
</Modal>
