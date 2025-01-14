import type { InterfaceAbi } from 'ethers';
import { WalletClientConnector, TransactionRequest, EventEmitter } from '$lib/services';
import type {
	ErrorTransactionSubscriber,
	ITransaction,
	SuccessTransactionSubscriber,
	IEventEmitter,
	IEthTxProps
} from '$lib/types';

export class EthereumTransaction implements ITransaction {
	private readonly WalletClientConnector: WalletClientConnector;
	private readonly TransactionRequest: TransactionRequest;
	private readonly EventEmitter: IEventEmitter;
	private readonly method: string;
	private readonly scAddress: string;
	private readonly args: unknown[];
	private readonly abi: InterfaceAbi;
	public txHash: string | null;

	constructor({ scAddress, abi, method, args, walletProvider, eventEmitter }: IEthTxProps) {
		this.EventEmitter = eventEmitter ?? new EventEmitter();

		this.WalletClientConnector = new WalletClientConnector({
			walletProvider,
			eventEmitter: this.EventEmitter
		});

		this.TransactionRequest = new TransactionRequest({
			abi
		});

		this.method = method;
		this.args = args;
		this.abi = abi;
		this.scAddress = scAddress;
		this.txHash = null;
	}

	public create = async () => {
		return this;
	};

	public run = async (): Promise<void> => {
		await this.TransactionRequest.run({
			scAddress: this.scAddress,
			walletClientConnector: this.WalletClientConnector,
			method: this.method,
			args: this.args
		});
	};

	public onSuccess = (fn: SuccessTransactionSubscriber): EthereumTransaction => {
		this.TransactionRequest.onSuccess(fn);
		return this;
	};

	public onReject = (fn: ErrorTransactionSubscriber): EthereumTransaction => {
		this.TransactionRequest.onReject(fn);
		return this;
	};

	public onFailure = (fn: ErrorTransactionSubscriber): EthereumTransaction => {
		this.TransactionRequest.onFailure(fn);
		return this;
	};
}
