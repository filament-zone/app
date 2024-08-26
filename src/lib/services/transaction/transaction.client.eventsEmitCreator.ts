import { EWalletProvider } from '$lib/services';
import type {
	ErrorTransactionPayload,
	ErrorTransactionSubscriber,
	SuccessTransactionPayload,
	SuccessTransactionSubscriber
} from '$lib/types';

export class TransactionClientEventsEmitCreator {
	private success: SuccessTransactionSubscriber[];
	private reject: ErrorTransactionSubscriber[];
	private failure: ErrorTransactionSubscriber[];

	constructor() {
		this.success = [];
		this.reject = [];
		this.failure = [];
	}

	protected successEmitCreator =
		(method: string, walletProvider: EWalletProvider) =>
		(payload: SuccessTransactionPayload): void =>
			this.success.forEach((subscriber) =>
				subscriber({
					method,
					walletProvider,
					...payload
				})
			);

	protected failureEmitCreator =
		(method: string, walletProvider: EWalletProvider) =>
		(payload: ErrorTransactionPayload): void =>
			this.failure.forEach((subscriber) =>
				subscriber({
					method,
					walletProvider,
					...payload
				})
			);

	protected rejectEmitCreator =
		(method: string, walletProvider: EWalletProvider) =>
		(payload: ErrorTransactionPayload): void =>
			this.reject.forEach((subscriber) =>
				subscriber({
					method,
					walletProvider,
					...payload
				})
			);

	public onSuccess = (fn: SuccessTransactionSubscriber): TransactionClientEventsEmitCreator => {
		this.success.push(fn);
		return this;
	};

	public onReject = (fn: ErrorTransactionSubscriber): TransactionClientEventsEmitCreator => {
		this.reject.push(fn);
		return this;
	};

	public onFailure = (fn: ErrorTransactionSubscriber): TransactionClientEventsEmitCreator => {
		this.failure.push(fn);
		return this;
	};

	public clearSubscriptions = (): TransactionClientEventsEmitCreator => {
		this.success = [];
		this.reject = [];
		this.failure = [];
		return this;
	};
}
