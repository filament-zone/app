import { browser } from '$app/environment';
import { type BrowserProvider, ethers } from 'ethers';
import type { IWalletClientBuilder } from '$lib/types';

export class MetamaskWalletClientBuilder implements IWalletClientBuilder {
	public MetamaskProvider: Window['ethereum'] | null;

	constructor() {
		this.MetamaskProvider =
			MetamaskWalletClientBuilder.isWindowProviderAvailable() && window?.ethereum
				? window?.ethereum
				: null;
	}

	public build = (): BrowserProvider | null => {
		return this.MetamaskProvider ? new ethers.BrowserProvider(this.MetamaskProvider) : null;
	};

	static isWindowProviderAvailable(): boolean {
		if (browser) {
			return !!window?.ethereum?.isMetaMask;
		} else {
			return false;
		}
	}
}
