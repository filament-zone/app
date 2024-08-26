import { EthereumTransaction, EventEmitter } from '$lib/services';
import type {
	ErrorTransactionSubscriber,
	IEventEmitter,
	ITransaction,
	SuccessTransactionSubscriber,
	TransactionConstructorProps
} from '$lib/types';

export class TransactionClientAdapter implements ITransaction {
	private readonly transaction: ITransaction;
	private readonly EventEmitter: IEventEmitter;

	constructor(props: TransactionConstructorProps) {
		this.EventEmitter = new EventEmitter();
		this.transaction = new EthereumTransaction({ ...props, eventEmitter: this.EventEmitter });
	}

	public run = async (): Promise<unknown> => {
		return this.transaction.run();
	};

	public onSuccess = (fn: SuccessTransactionSubscriber): TransactionClientAdapter => {
		this.transaction.onSuccess(fn);
		return this;
	};

	public onReject = (fn: ErrorTransactionSubscriber): TransactionClientAdapter => {
		this.transaction.onReject(fn);
		return this;
	};

	public onFailure = (fn: ErrorTransactionSubscriber): TransactionClientAdapter => {
		this.transaction.onFailure(fn);
		return this;
	};
}
