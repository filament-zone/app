import { WalletClientConnector, HubTransactionRequest, HubTransactionPrepare } from '$lib/services';
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
	private preparedTx: Uint8Array | null;
	public txHash: string | null;

	constructor(payload: IHubTxProps) {
		this.TransactionRequest = new HubTransactionRequest();
		this.WalletClientConnector = new WalletClientConnector({
			walletProvider: payload.walletProvider
		});

		this.payload = payload.payload;
		this.preparedTx = null;
		this.txHash = null;
	}

	public create = async (): Promise<HubTransaction> => {
		const { tx_hash } = await import('@filament-zone/filament/filament_hub_wasm');

		this.preparedTx = await new HubTransactionPrepare({
			payload: this.payload,
			walletClientConnector: this.WalletClientConnector
		}).prepareTransaction();

		if (!this.preparedTx) {
			return this;
		}

		this.txHash = tx_hash(this.preparedTx);

		return this;
	};

	public run = async (): Promise<void> => {
		if (!this.preparedTx) {
			return;
		}
		await this.TransactionRequest.run(this.preparedTx);
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
