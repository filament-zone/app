import { type BrowserProvider, ethers } from 'ethers';

import type { IWalletClientBuilder } from '$lib/types';

export class MetamaskWalletClientBuilder implements IWalletClientBuilder {
	public MetamaskProvider: Window['ethereum'] | null;

	constructor() {
		this.MetamaskProvider =
			MetamaskWalletClientBuilder.isWindowProviderAvailable() && window.ethereum
				? window.ethereum
				: null;
	}

	public build = (): BrowserProvider | null => {
		return this.MetamaskProvider ? new ethers.BrowserProvider(this.MetamaskProvider) : null;
	};

	static isWindowProviderAvailable(): boolean {
		return !!window.ethereum?.isMetaMask;
	}

	static async isProviderConnected(): Promise<boolean> {
		let accounts: string[];
		if (MetamaskWalletClientBuilder.isWindowProviderAvailable()) {
			accounts = (await window.ethereum?.request({ method: 'eth_accounts' })) as string[];
			return !!accounts.length;
		}
		return Promise.resolve(false);
	}
}
