import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IFooterProps_ = typeof __propDef.props;
export type { IFooterProps_ as IFooterProps };
export type IFooterEvents = typeof __propDef.events;
export type IFooterSlots = typeof __propDef.slots;

export default class Footer extends SvelteComponent<IFooterProps, IFooterEvents, IFooterSlots> {}
