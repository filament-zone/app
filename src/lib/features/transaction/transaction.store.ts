import { get } from 'svelte/store';
import { toastsStore, walletStore } from '$lib/features';
import { TransactionClientAdapter } from '$lib/services';
import {
	SC_ABI_CONFIG,
	SC_ADDRESS_CONFIG
} from '$lib/services/transaction/ethereum.transaction/ethereum.config';
import { type ITransactionStore, type TNewTransaction } from '$lib/types';

const { send } = toastsStore;

const newTransaction: TNewTransaction = (abi, method, args) => {
	const { wallet } = walletStore;
	const walletProvider = get(wallet).walletProvider;

	if (!walletProvider || !SC_ADDRESS_CONFIG || !SC_ABI_CONFIG) {
		return null;
	}

	const transaction = new TransactionClientAdapter({
		scAddress: SC_ADDRESS_CONFIG[abi],
		abi: SC_ABI_CONFIG[abi],
		method: method as string,
		args: args as unknown[],
		walletProvider
	});

	transaction.onSuccess((payload) => {
		send({ message: `Transaction with hash ${payload.transactionHash} completed` });
	});

	transaction.onReject(() => {
		send({ message: `You rejected transaction` });
	});

	transaction.onFailure(() => {
		send({ message: `Transaction fail` });
	});

	return transaction;
};

export const transactionStore: ITransactionStore = {
	newTransaction
};
