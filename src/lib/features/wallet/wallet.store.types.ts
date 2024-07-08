import type { Writable } from 'svelte/store';
import { type IWalletClientConnector } from '$lib/services';
import { EWalletProvider } from '$lib/types';

export interface IChain {
	chainId: bigint | null;
	name: string | null;
}

export interface IWalletState {
	address: string | null;
	network: string | null;
	connected: boolean;
	client: IWalletClientConnector | null;
	chain: IChain | null;
	balance: string | null;
}

export interface IWalletStore {
	wallet: Writable<IWalletState>;
	initializeWallet: (walletProvider: EWalletProvider) => void;
	disconnectWallet: () => void;
}
