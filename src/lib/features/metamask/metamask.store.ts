import { get, writable } from 'svelte/store';
import { ethers } from 'ethers';
import { type IMetamaskStore } from '$lib/types';
import { modalStore } from '$lib/features';

const loaded: IMetamaskStore['loaded'] = writable(false);
const isMetamaskPresent: IMetamaskStore['isMetamaskPresent'] = writable(false);
const signer: IMetamaskStore['signer'] = writable(null);
const provider: IMetamaskStore['provider'] = writable(null);

const initMetamask: IMetamaskStore['initMetamask'] = async () => {
	if (window.ethereum == null) {
		console.log('MetaMask not installed');
	} else {
		isMetamaskPresent.set(true);

		const browserProvider = new ethers.BrowserProvider(window.ethereum);
		if (browserProvider) {
			provider.set(browserProvider);
			loaded.set(true);
		}

		if (provider) {
			const signerRes = await get(provider)?.getSigner();
			if (signerRes) {
				signer.set(signerRes);
			}
		}
	}
};

const connect: IMetamaskStore['connect'] = async () => {
	initMetamask();
	const { closeModal } = modalStore;
	closeModal();
};

const disconnect: IMetamaskStore['disconnect'] = async () => {
	signer.set(null);
	provider.set(null);
	isMetamaskPresent.set(false);
	loaded.set(false);
};

export const metamaskStore: IMetamaskStore = {
	isMetamaskPresent,
	loaded,
	signer,
	provider,
	initMetamask,
	connect,
	disconnect
};
