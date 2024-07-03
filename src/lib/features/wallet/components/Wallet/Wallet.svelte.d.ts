import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		isOpen: boolean;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IWalletProps_ = typeof __propDef.props;
export type { IWalletProps_ as IWalletProps };
export type IWalletEvents = typeof __propDef.events;
export type IWalletSlots = typeof __propDef.slots;

export default class Wallet extends SvelteComponent<IWalletProps, IWalletEvents, IWalletSlots> {}
