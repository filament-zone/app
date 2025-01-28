import { TransactionClientEventsEmitCreator } from '../transaction.client.eventsEmitCreator';
import { TransactionHubApiClient } from '$lib/api';
import { EWalletProvider } from '$lib/services';

export class HubTransactionRequest extends TransactionClientEventsEmitCreator {
	public run = async (preparedTx: Uint8Array): Promise<void> => {
		try {
			const successEmitSubscribers = this.successEmitCreator('', EWalletProvider.METAMASK);
			const failureEmitSubscribers = this.failureEmitCreator('', EWalletProvider.METAMASK);

			await TransactionHubApiClient.sendTx(preparedTx).then((payload) => {
				if (payload.error) {
					failureEmitSubscribers({ error: new Error(payload.error.message) });
				} else {
					successEmitSubscribers({ data: { ...payload } });
				}
			});
		} catch {
			console.log('catch error');
		}
	};
}
