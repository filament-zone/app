import { get, writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { walletStore } from '$lib/features';
import { EventEmitter, EWalletProvider, HubService } from '$lib/services';
import { AccountHubApiClient } from '$lib/api';
import type {
	IHubStore,
	ITransactionErrorPayload,
	ITransactionStartPayload,
	ITransactionState,
	ITransactionSuccessPayload,
	TUpdateTransactionState
} from '$lib/features/hub/hob.store.types';

export const transactionsStore = writable<ITransactionState[]>([]);

export const processHubTransaction: IHubStore['processHubTransaction'] = async ({ msg }) => {
	const hubService = new HubService();

	try {
		const eventEmitter = new EventEmitter();
		const id = uuidv4();

		eventEmitter.on('transaction:start', (payload) => {
			updateTransactionState({
				id: (payload as ITransactionStartPayload).id,
				status: 'processing'
			});
		});

		eventEmitter.on('transaction:success', (payload) => {
			updateTransactionState({
				id: (payload as ITransactionSuccessPayload).id,
				status: 'success'
			});
		});

		eventEmitter.on('transaction:error', (payload) => {
			updateTransactionState({
				id: (payload as ITransactionStartPayload).id,
				status: 'error',
				error: (payload as ITransactionErrorPayload).error
			});
		});

		const { wallet, initializeWallet } = walletStore;

		if (!get(wallet).address) {
			await initializeWallet(EWalletProvider.METAMASK);
		}

		const transactionState: ITransactionState = {
			id,
			status: 'processing',
			error: null
		};

		transactionsStore.update((transactions) => [...transactions, transactionState]);

		if (!get(wallet).address) {
			return;
		}

		const {
			data: { nonce }
		} = await AccountHubApiClient.getAccountInfoByEthAddr(get(wallet).address as string);

		await hubService.processHubTransaction({
			id,
			msg,
			nonce: nonce,
			eventEmitter
		});
	} catch (error) {
		console.error('Error processing transaction:', error);
	}
};

export const updateTransactionState: TUpdateTransactionState = ({ id, status, error = null }) => {
	transactionsStore.update((transactions) =>
		transactions.map((tx) => (tx.id === id ? { ...tx, status, error } : tx))
	);
};

export const hubStore: IHubStore = {
	transactionsStore,
	processHubTransaction
};
