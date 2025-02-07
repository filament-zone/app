<script lang="ts">
	import { writable } from 'svelte/store';
	import { Modal, modalStore, transactionStore, TxTimeLineItem } from '$lib/features';
	import { Button, Divider, Typography } from '$lib/components';
	import {
		ETxTimeLineItem,
		type ITxTimeLineItemProps,
		type TModalTransactionConfig
	} from '$lib/types';

	const { closeModal, modalConfig } = modalStore;

	$: state = $modalConfig.state as {
		config?: TModalTransactionConfig;
		txHash?: string;
	};

	const step = writable<number>(0);

	const { transactions } = transactionStore;

	$: tx = $transactions.find((tx) => tx.txHash === state?.txHash);

	$: {
		if (tx?.isInSequencer) {
			step.set(1);
		}

		if (tx?.isInLedger) {
			step.set(2);
		}
	}
	$: timeLine1 = {
		iconStatus: ETxTimeLineItem.PROCESSING,
		title: state?.config?.timeLine?.[1].title ?? 'Transaction Submitted',
		description: state?.config?.timeLine?.[1].description ?? 'Transaction has been submitted',
		isFirst: true
	};

	$: timeLine2 = {
		iconStatus: ETxTimeLineItem.PROCESSING,
		title: state?.config?.timeLine?.[2].title ?? 'Transaction Received',
		description:
			state?.config?.timeLine?.[2].description ??
			'Transaction has been received and is being processed',
		isLast: true
	};

	$: modalConfigLocal = {
		0: {
			timeLine1,
			timeLine2
		},
		1: {
			timeLine1: { ...timeLine1, iconStatus: ETxTimeLineItem.CHECKED },
			timeLine2: { ...timeLine2 }
		},
		2: {
			timeLine1: { ...timeLine1, iconStatus: ETxTimeLineItem.CHECKED },
			timeLine2: {
				...timeLine2,
				iconStatus: ETxTimeLineItem.CHECKED
			}
		}
	} as Record<
		number,
		{
			timeLine1: ITxTimeLineItemProps;
			timeLine2: ITxTimeLineItemProps;
		}
	>;
</script>

<Modal classNames="max-w-96" closeOnClickOutside={false}>
	<div slot="header">
		<Typography variant="h5">{state?.config?.common?.title ?? 'Transaction Status'}</Typography>
	</div>
	<div slot="content" class="flex flex-col justify-between h-full">
		{#if state?.config?.common?.title}
			<Typography variant="h6" class="mb-4">{state?.config.common.description}</Typography>
			<Divider class="mb-8" />
			<Typography variant="h6" class="mb-4">Transaction Status</Typography>
		{/if}
		{#if tx?.error}
			<TxTimeLineItem
				iconStatus={ETxTimeLineItem.FAILED}
				title={state?.config?.error?.title ?? 'Transaction Failed'}
				description={state?.config?.error?.title ?? ' 22'}
				isLast
				isFirst
			/>
		{:else}
			<div>
				<TxTimeLineItem {...modalConfigLocal[$step].timeLine2} />
				<TxTimeLineItem {...modalConfigLocal[$step].timeLine1} />
			</div>
		{/if}
		<Button class="ml-auto mt-8" variant="secondary" on:click={closeModal}>Close</Button>
	</div>
</Modal>
