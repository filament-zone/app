import { type EthersError, type InterfaceAbi } from 'ethers';
import { EWalletProvider, EWalletProviderError } from '$lib/services';
import type { IEventEmitter } from '$lib/services/event-emitter/event-emitter.types';

export type SuccessTransactionSubscriber = (payload: SuccessTransactionResponseCb) => void;

export type ErrorTransactionSubscriber = (payload: ErrorTransactionResponseCb) => void;

export interface ITransaction {
	run: () => void;
	onSuccess: (fn: SuccessTransactionSubscriber) => ITransaction;
	onReject: (fn: ErrorTransactionSubscriber) => ITransaction;
	onFailure: (fn: ErrorTransactionSubscriber) => ITransaction;
}

export interface TransactionConstructorProps {
	scAddress: string;
	abi: InterfaceAbi;
	method: string;
	args: unknown[];
	walletProvider: EWalletProvider;
	eventEmitter?: IEventEmitter;
}

export interface TransactionError {
	code: EWalletProviderError;
	message?: string;
	originalError: EthersError;
}

export interface CommonTransactionPayload {
	method: string;
	walletProvider: EWalletProvider;
}

export interface SuccessTransactionPayload {
	data: unknown;
}

export interface ErrorTransactionPayload {
	error: TransactionError | Error;
}

export type SuccessTransactionResponseCb = CommonTransactionPayload & SuccessTransactionPayload;

export type ErrorTransactionResponseCb = CommonTransactionPayload & ErrorTransactionPayload;
