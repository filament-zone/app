import type { Writable } from 'svelte/store';
import type { ErrorTransactionPayload, ITxTimeLineItemProps } from '$lib/types';

export type TModalTransactionConfig = {
	common?: { title: string; description: string };
	error?: { title: string; description: string };
	timeLine?: Record<number, ITxTimeLineItemProps>;
};

export interface ITransactionStatus {
	txHash: string;
	isInSequencer: boolean;
	isInLedger: boolean;
	error?: ErrorTransactionPayload['error'];
}

export interface ITransactionStore {
	transactions: Writable<ITransactionStatus[]>;
	addTransaction: (tx: string) => void;
	updateTransaction: (txHash: string, updates: Partial<ITransactionStatus>) => void;
}
