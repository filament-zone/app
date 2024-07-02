import type { Writable } from 'svelte/store';
import { type BrowserProvider, JsonRpcSigner } from 'ethers';

export interface IMetamaskStore {
	initMetamask: () => void;
	loaded: Writable<boolean>;
	isMetamaskPresent: Writable<boolean>;
	signer: Writable<JsonRpcSigner | null>;
	provider: Writable<BrowserProvider | null>;
	connect: () => void;
}
