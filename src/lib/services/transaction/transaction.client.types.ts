import { type EthersError, type InterfaceAbi } from 'ethers';
import { EWalletProvider, EWalletProviderError, WalletClientConnector } from '$lib/services';
import type { IEventEmitter } from '$lib/services/event-emitter/event-emitter.types';

export type SuccessTransactionSubscriber = (payload: SuccessTransactionResponseCb) => void;

export type ErrorTransactionSubscriber = (payload: ErrorTransactionResponseCb) => void;

export interface ITransaction {
	create: () => Promise<ITransaction | undefined>;
	run: () => Promise<void>;
	onSuccess: (fn: SuccessTransactionSubscriber) => ITransaction;
	onReject: (fn: ErrorTransactionSubscriber) => ITransaction;
	onFailure: (fn: ErrorTransactionSubscriber) => ITransaction;
	txHash: string | null;
}

export enum EClient {
	THE_HUB = 'THE_HUB',
	ETHEREUM = 'ETHEREUM'
}

export interface ITxProps {
	client: EClient;
	eventEmitter?: IEventEmitter;
	walletProvider: EWalletProvider;
	walletClientConnector?: WalletClientConnector;
}

export interface IEthTxProps extends ITxProps {
	scAddress: string;
	abi: InterfaceAbi;
	method: string;
	args: unknown[];
}

export interface IHubTxProps extends ITxProps {
	payload: object;
}

export type TransactionConstructorProps = IEthTxProps | IHubTxProps;

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
