import type { Writable } from 'svelte/store';
import type { ITimeLineItemProps } from '$lib/types';

export type TModalTransactionConfig = Record<number, ITimeLineItemProps>;

export interface ITransactionStatus {
	txHash: string;
	isInSequencer: boolean;
	isInLedger: boolean;
}

export interface ITransactionStore {
	transactions: Writable<ITransactionStatus[]>;
	addTransaction: (tx: string) => void;
	updateTransaction: (txHash: string, updates: Partial<ITransactionStatus>) => void;
}
