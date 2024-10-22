import type { Writable } from 'svelte/store';

export interface ITransactionState {
	id: string;
	status: string;
	error?: string | null;
}

export interface IHubStore {
	transactionsStore: Writable<ITransactionState[]>;
	processHubTransaction: ({ msg }: { msg: object }) => Promise<void>;
}

export type TUpdateTransactionState = (txState: ITransactionState) => void;

export interface ITransactionStartPayload {
	id: string;
	msg: Uint8Array;
}

export interface ITransactionSuccessPayload {
	id: string;
}

export interface ITransactionErrorPayload {
	id: string;
	error: string;
}

export type TransactionEventType =
	| 'transaction:start'
	| 'transaction:success'
	| 'transaction:error';
