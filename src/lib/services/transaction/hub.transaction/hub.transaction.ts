import { WalletClientConnector, HubTransactionRequest, EventEmitter } from '$lib/services';
import {
	type ErrorTransactionSubscriber,
	type ITransaction,
	type SuccessTransactionSubscriber,
	type IEventEmitter,
	type IHubTxProps
} from '$lib/types';

export class HubTransaction implements ITransaction {
	private readonly WalletClientConnector: WalletClientConnector;
	private readonly payload: IHubTxProps['payload'];
	private readonly TransactionRequest: HubTransactionRequest;
	private readonly eventEmitter: IEventEmitter;

	constructor(payload: IHubTxProps) {
		this.eventEmitter = payload.eventEmitter ?? new EventEmitter();
		this.payload = payload.payload;

		this.WalletClientConnector = new WalletClientConnector({
			walletProvider: payload.walletProvider,
			eventEmitter: this.eventEmitter
		});

		this.TransactionRequest = new HubTransactionRequest({
			eventEmitter: this.eventEmitter,
			walletClientConnector: this.WalletClientConnector
		});
	}

	public run = async (): Promise<void> => {
		await this.TransactionRequest.run(this.payload);
	};

	public onSuccess = (fn: SuccessTransactionSubscriber): HubTransaction => {
		this.TransactionRequest.onSuccess(fn);
		return this;
	};

	public onReject = (fn: ErrorTransactionSubscriber): HubTransaction => {
		this.TransactionRequest.onReject(fn);
		return this;
	};

	public onFailure = (fn: ErrorTransactionSubscriber): HubTransaction => {
		this.TransactionRequest.onFailure(fn);
		return this;
	};
}
