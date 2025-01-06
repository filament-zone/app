import { TransactionClientEventsEmitCreator } from '../transaction.client.eventsEmitCreator';
import { TransactionHubApiClient } from '$lib/api';
import { HubTransactionPrepare } from '$lib/services/transaction/hub.transaction/hub.transaction.prepare';
import type {
	ErrorTransactionPayload,
	IHubTxProps
} from '$lib/services/transaction/transaction.client.types';
import { EventEmitter, EWalletProvider, WalletClientConnector } from '$lib/services';
import type { IEventEmitter } from '$lib/services/event-emitter/event-emitter.types';

export class HubTransactionRequest extends TransactionClientEventsEmitCreator {
	private readonly walletClientConnector: WalletClientConnector;
	private readonly eventEmitter: IEventEmitter;

	constructor({
		eventEmitter,
		walletClientConnector
	}: {
		eventEmitter: IEventEmitter;
		walletClientConnector: WalletClientConnector;
	}) {
		super();
		this.walletClientConnector = walletClientConnector;
		this.eventEmitter = eventEmitter ?? new EventEmitter();
	}

	public run = async (payload: IHubTxProps['payload']): Promise<void> => {
		try {
			const successEmitSubscribers = this.successEmitCreator('', EWalletProvider.METAMASK);
			const failureEmitSubscribers = this.failureEmitCreator('', EWalletProvider.METAMASK);

			const preparedTx = await new HubTransactionPrepare({
				payload,
				eventEmitter: this.eventEmitter,
				walletClientConnector: this.walletClientConnector
			}).prepareTransaction();

			if (!preparedTx) {
				return;
			}
			await TransactionHubApiClient.sendTx(preparedTx)
				.then((payload) => {
					successEmitSubscribers(payload);
				})
				.catch((error: ErrorTransactionPayload) => {
					failureEmitSubscribers(error);
				});
		} catch {
			console.log('catch error');
		}
	};
}
