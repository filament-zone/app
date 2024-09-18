import { writable } from 'svelte/store';
import { EventEmitter, HubService } from '$lib/services';
import type {
	IHubStore,
	ITransactionErrorPayload,
	ITransactionStartPayload,
	ITransactionState,
	ITransactionSuccessPayload,
	TUpdateTransactionState
} from '$lib/features/hub/hob.store.types';
import { v4 as uuidv4 } from 'uuid';

const hubService = new HubService();

export const transactionsStore = writable<ITransactionState[]>([]);

export const processHubTransaction: IHubStore['processHubTransaction'] = async ({ msg }) => {
	try {
		const eventEmitter = new EventEmitter();
		const id = uuidv4();

		eventEmitter.on('transaction:start', (payload) => {
			console.log('transaction:start', payload);
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

		const transactionState: ITransactionState = {
			id,
			status: 'processing',
			error: null
		};

		transactionsStore.update((transactions) => [...transactions, transactionState]);

		await hubService.processHubTransaction({ id, msg, eventEmitter });
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
