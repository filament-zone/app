import type { Writable } from 'svelte/store';
import { WalletClientConnector } from '$lib/services';
import { EWalletProvider } from '$lib/types';

export interface IChain {
	chainId: bigint | null;
	name: string | null;
}

export interface IWalletState {
	address: string | null;
	network: string | null;
	connected: boolean;
	client: WalletClientConnector | null;
	chain: IChain | null;
	balance: string | null;
	walletProvider: EWalletProvider | null;
}

export interface IWalletStore {
	wallet: Writable<IWalletState>;
	initializeWallet: (walletProvider: EWalletProvider) => void;
	disconnectWallet: () => void;
}
