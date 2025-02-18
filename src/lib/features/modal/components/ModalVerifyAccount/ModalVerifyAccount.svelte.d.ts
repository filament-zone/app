import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IModalConnectWalletProps_ = typeof __propDef.props;
export type { IModalConnectWalletProps_ as IModalConnectWalletProps };
export type IModalConnectWalletEvents = typeof __propDef.events;
export type IModalConnectWalletSlots = typeof __propDef.slots;

export default class ModalConnectWallet extends SvelteComponent<
	IModalConnectWalletProps,
	IModalConnectWalletEvents,
	IModalConnectWalletSlots
> {}
