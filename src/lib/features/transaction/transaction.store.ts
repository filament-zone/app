import { writable } from 'svelte/store';
import type { ITransactionStatus, ITransactionStore } from '$lib/types';

const transactions = writable<ITransactionStatus[]>([]);

const addTransaction: ITransactionStore['addTransaction'] = (transaction) => {
	transactions.update((current) => {
		if (!current.find((tx) => tx.txHash === transaction)) {
			return [...current, { txHash: transaction, isInSequencer: false, isInLedger: false }];
		}
		return current;
	});
};

const updateTransaction: ITransactionStore['updateTransaction'] = (txHash, updates) => {
	transactions.update((current) =>
		current.map((tx) => {
			if (tx.txHash === txHash) {
				return { ...tx, ...updates };
			}
			return tx;
		})
	);
};

export const transactionStore: ITransactionStore = {
	transactions,
	addTransaction,
	updateTransaction
};
