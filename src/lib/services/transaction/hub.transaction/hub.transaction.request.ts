import { TransactionClientEventsEmitCreator } from '../transaction.client.eventsEmitCreator';
import { TransactionHubApiClient } from '$lib/api';
import { EWalletProvider } from '$lib/services';
import { modalStore, toastsStore, transactionStore } from '$lib/features';
import { invalidateAll } from '$app/navigation';
import { EModalVariant } from '$lib/features/modal/modal.store.enums';

export class HubTransactionRequest extends TransactionClientEventsEmitCreator {
	public run = async (preparedTx: Uint8Array, txHash: string): Promise<void> => {
		try {
			const successEmitSubscribers = this.successEmitCreator('', EWalletProvider.METAMASK);
			const failureEmitSubscribers = this.failureEmitCreator('', EWalletProvider.METAMASK);

			const { updateTransaction } = transactionStore;
			const { modalConfig } = modalStore;

			const unsubscribeModal = modalConfig.subscribe(($modalConfig) => {
				if ($modalConfig.variant === EModalVariant.CLOSED) {
					toastsStore.display(txHash);
				} else {
					toastsStore.hide(txHash);
				}
			});

			await TransactionHubApiClient.sendTx(preparedTx).then((payload) => {
				if (payload.error) {
					const error = new Error(payload.error.message);
					failureEmitSubscribers({ error });
					updateTransaction(txHash, { error });
					unsubscribeModal();
					setTimeout(() => {
						toastsStore.remove(txHash);
					}, 1000);
				} else {
					let completed = false;
					let attempts = 0;
					updateTransaction(txHash, { isInSequencer: true });

					const interval = setInterval(async () => {
						attempts += 1;
						if (!txHash) {
							return;
						}

						const res = await TransactionHubApiClient.getTxStatusLedger(txHash);

						if (res.data?.receipt.result === 'successful') {
							updateTransaction(txHash, { isInLedger: true });
							completed = true;
						}

						if (completed || attempts >= 5) {
							clearInterval(interval);

							if (!completed) {
								updateTransaction(txHash, {});
							}
							if (completed) {
								await invalidateAll();
								successEmitSubscribers({ data: { ...payload } });
								unsubscribeModal();
								setTimeout(() => {
									toastsStore.remove(txHash);
								}, 1000);
							}
						}
					}, 1000);
				}
			});
		} catch {
			console.log('catch error');
		}
	};
}
