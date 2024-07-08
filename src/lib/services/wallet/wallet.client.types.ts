import type { BrowserProvider } from 'ethers';
import type { IChain } from '$lib/features/wallet/wallet.store.types';

export enum EWalletProvider {
	METAMASK = 'metamask'
}

export enum EWalletProviderError {
	REQUEST_PENDING = 'requestPending',
	USER_REJECTED_REQUEST = 'userRejectedRequest',
	INTERNAL_ERROR = 'internalError',
	UNKNOWN = 'unknown'
}

export type WalletClient = BrowserProvider;

export interface IWalletClientConnectorConstructorProps {
	walletProvider: EWalletProvider;
}

export type TWalletClientConnectorCallback = (data?: unknown) => unknown;

export interface IWalletClientConnector {
	connect: (cb?: () => void) => Promise<IWalletClientConnector>;
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
	switchChain: () => Promise<IWalletClientConnector>;
}

export interface IWalletClientBuilderConstructorProps {
	walletProvider: EWalletProvider;
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
