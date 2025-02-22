import type { InterfaceAbi } from 'ethers';
import { EthereumTransaction, EventEmitter, EWalletProvider } from '$lib/services';
import { HubTransaction } from '$lib/services/transaction/hub.transaction';
import {
	EClient,
	type ErrorTransactionSubscriber,
	type IEventEmitter,
	type IHubTxProps,
	type ITransaction,
	type SuccessTransactionSubscriber,
	type TransactionConstructorProps
} from '$lib/types';

export class TransactionClientAdapter implements ITransaction {
	private readonly client: EClient;
	private readonly transaction: ITransaction | null;
	private readonly eventEmitter: IEventEmitter;
	public txHash: string | null;

	constructor(props: TransactionConstructorProps) {
		this.client = props.client;
		this.eventEmitter = new EventEmitter();
		this.transaction = null;
		this.txHash = null;

		switch (this.client) {
			case EClient.ETHEREUM: {
				this.transaction = new EthereumTransaction({
					...(props as { scAddress: string; abi: InterfaceAbi; method: string; args: unknown[] }),
					eventEmitter: this.eventEmitter,
					walletProvider: EWalletProvider.METAMASK,
					client: this.client
				});
				break;
			}
			case EClient.THE_HUB: {
				this.transaction = new HubTransaction({
					...(props as IHubTxProps),
					walletProvider: EWalletProvider.METAMASK,
					client: this.client
				});
				break;
			}
		}
	}

	public create = async () => {
		return this.transaction?.create();
	};

	public run = async () => {
		await this.transaction?.run();
	};

	public onSuccess = (fn: SuccessTransactionSubscriber): TransactionClientAdapter => {
		this.transaction?.onSuccess(fn);
		return this;
	};

	public onReject = (fn: ErrorTransactionSubscriber): TransactionClientAdapter => {
		this.transaction?.onReject(fn);
		return this;
	};

	public onFailure = (fn: ErrorTransactionSubscriber): TransactionClientAdapter => {
		this.transaction?.onFailure(fn);
		return this;
	};
}
