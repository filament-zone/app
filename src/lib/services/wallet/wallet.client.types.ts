import { type BrowserProvider, type EthersError, JsonRpcSigner } from 'ethers';
import type { IChain } from '$lib/features/wallet/wallet.store.types';
import type { IEventEmitter } from '$lib/services/event-emitter/event-emitter.types';
import type { TransactionError } from '$lib/services/transaction/transaction.client.types';

export enum EWalletProvider {
	METAMASK = 'metamask'
}

export enum EWalletProviderError {
	REQUEST_PENDING = 'requestPending',
	USER_REJECTED_REQUEST = 'userRejectedRequest',
	INTERNAL_ERROR = 'internalError',
	UNKNOWN = 'unknown',
	METAMASK_NOT_AVAILABLE = 'metamaskNotAvailable'
}

export type WalletClient = BrowserProvider;

export interface IWalletClientConnectorConstructorProps {
	walletProvider: EWalletProvider;
	eventEmitter?: IEventEmitter;
}

export type TWalletClientConnectorCallback = (data?: unknown) => unknown;

export interface IWalletClientConnector {
	connect: (cb?: () => void) => Promise<IWalletClientConnector['BrowserProvider']>;
	disconnect: (cb?: () => void) => IWalletClientConnector;
	on?: (
		event: WalletClientEventE,
		callback: TWalletClientConnectorCallback
	) => IWalletClientConnector;
	off?: (
		event: WalletClientEventE,
		callback: TWalletClientConnectorCallback
	) => IWalletClientConnector;
	getAccountInfo: (callback?: TWalletClientConnectorCallback) => Promise<IWalletClientConnector>;
	getAccountBalance: (
		address: string,
		callback?: TWalletClientConnectorCallback
	) => Promise<IWalletClientConnector>;
	switchChain: (chainId: bigint) => Promise<IWalletClientConnector>;
	Signer?: JsonRpcSigner | null;
	createErrorPayload: (error: EthersError) => TransactionError;
	BrowserProvider?: BrowserProvider | null;
}

export type WalletClientEventE =
	| 'accept'
	| 'reject'
	| 'error'
	| 'AccountInfo'
	| 'AccountsChanged'
	| 'ChainChanged'
	| 'connect';

export interface IAccountInfo {
	address: string;
	chain: IChain;
}

export interface IAccountBalance {
	balance: string;
}

export interface IWalletClientBuilder {
	build: () => WalletClient | null;
}
