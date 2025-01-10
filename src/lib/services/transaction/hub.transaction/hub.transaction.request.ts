import { TransactionClientEventsEmitCreator } from '../transaction.client.eventsEmitCreator';
import { TransactionHubApiClient } from '$lib/api';
import { HubTransactionPrepare } from '$lib/services/transaction/hub.transaction/hub.transaction.prepare';
import type {
	ErrorTransactionPayload,
	IHubTxProps
} from '$lib/services/transaction/transaction.client.types';
import { EWalletProvider, WalletClientConnector } from '$lib/services';

export class HubTransactionRequest extends TransactionClientEventsEmitCreator {
	private readonly walletClientConnector: WalletClientConnector;

	constructor({ walletClientConnector }: { walletClientConnector: WalletClientConnector }) {
		super();
		this.walletClientConnector = walletClientConnector;
	}

	public run = async (payload: IHubTxProps['payload']): Promise<void> => {
		try {
			const { tx_hash } = await import('@filament-zone/filament/filament_hub_wasm');
			const successEmitSubscribers = this.successEmitCreator('', EWalletProvider.METAMASK);
			const failureEmitSubscribers = this.failureEmitCreator('', EWalletProvider.METAMASK);

			const preparedTx = await new HubTransactionPrepare({
				payload,
				walletClientConnector: this.walletClientConnector
			}).prepareTransaction();

			if (!preparedTx) {
				return;
			}
			const txHash = tx_hash(preparedTx);
			await TransactionHubApiClient.sendTx(preparedTx)
				.then((payload) => {
					successEmitSubscribers({ data: { ...payload, txHash } });
				})
				.catch((error: ErrorTransactionPayload) => {
					failureEmitSubscribers(error);
				});
		} catch {
			console.log('catch error');
		}
	};
}
