import { TransactionClientEventsEmitCreator } from '../transaction.client.eventsEmitCreator';
import { TransactionHubApiClient } from '$lib/api';
import { EWalletProvider } from '$lib/services';
import { transactionStore } from '$lib/features';
import { invalidateAll } from '$app/navigation';

export class HubTransactionRequest extends TransactionClientEventsEmitCreator {
	public run = async (preparedTx: Uint8Array, txHash: string): Promise<void> => {
		try {
			const successEmitSubscribers = this.successEmitCreator('', EWalletProvider.METAMASK);
			const failureEmitSubscribers = this.failureEmitCreator('', EWalletProvider.METAMASK);

			const { updateTransaction } = transactionStore;

			await TransactionHubApiClient.sendTx(preparedTx).then((payload) => {
				if (payload.error) {
					const error = new Error(payload.error.message);
					updateTransaction(txHash, { error });
					failureEmitSubscribers({ error });
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
