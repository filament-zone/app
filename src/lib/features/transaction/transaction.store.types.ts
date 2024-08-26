import type { EContract } from '$lib/services/transaction/ethereum.transaction/ethereum.enums';
import { TransactionClientAdapter } from '$lib/services';

export type TTransactionMethod = unknown;

export type TNewTransaction = <TArgs>(
	abi: EContract,
	method: TTransactionMethod,
	args?: TArgs
) => TransactionClientAdapter | null;

export interface ITransactionStore {
	newTransaction: TNewTransaction;
}
