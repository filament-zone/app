import { WalletClientConnector, HubTransactionRequest } from '$lib/services';
import {
	type ErrorTransactionSubscriber,
	type ITransaction,
	type SuccessTransactionSubscriber,
	type IHubTxProps
} from '$lib/types';

export class HubTransaction implements ITransaction {
	private readonly WalletClientConnector: WalletClientConnector;
	private readonly payload: IHubTxProps['payload'];
	private readonly TransactionRequest: HubTransactionRequest;

	constructor(payload: IHubTxProps) {
		this.payload = payload.payload;

		this.WalletClientConnector = new WalletClientConnector({
			walletProvider: payload.walletProvider
		});

		this.TransactionRequest = new HubTransactionRequest({
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
