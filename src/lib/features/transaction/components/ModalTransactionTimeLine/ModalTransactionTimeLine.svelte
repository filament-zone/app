<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Modal, modalStore, transactionStore } from '$lib/features';
	import { Button, Typography, TimeLineItem } from '$lib/components';
	import { ETimeLineItem, type ITimeLineItemProps, type TModalTransactionConfig } from '$lib/types';

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

	const timeLine1 = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: state?.config?.[1].title ?? 'Transaction Submitted',
		description: state?.config?.[1].description ?? 'Transaction has been submitted',
		isFirst: true
	};

	const timeLine2 = {
		iconStatus: ETimeLineItem.PROCESSING,
		title: state?.config?.[2].title ?? 'Transaction Received',
		description:
			state?.config?.[2].description ?? 'Transaction has been received and is being processed',
		isLast: true
	};

	const modalConfigLocal: Record<
		number,
		{
			timeLine1: ITimeLineItemProps;
			timeLine2: ITimeLineItemProps;
		}
	> = {
		0: {
			timeLine1,
			timeLine2
		},
		1: {
			timeLine1: { ...timeLine1, iconStatus: ETimeLineItem.CHECKED },
			timeLine2
		},
		2: {
			timeLine1: { ...timeLine1, iconStatus: ETimeLineItem.CHECKED },
			timeLine2: {
				...timeLine2,
				iconStatus: ETimeLineItem.CHECKED
			}
		}
	};

	onDestroy(() => {
		transactions.set([]);
	});
</script>

<Modal classNames="max-w-96" closeOnClickOutside={false}>
	<div slot="header">
		<Typography variant="h5">Transaction status:</Typography>
	</div>
	<div slot="content">
		<div>
			<TimeLineItem {...modalConfigLocal[$step].timeLine2} />
			<TimeLineItem {...modalConfigLocal[$step].timeLine1} />
		</div>
		<Button class="ml-auto mt-8" variant="secondary" on:click={closeModal}>Close</Button>
	</div>
</Modal>
