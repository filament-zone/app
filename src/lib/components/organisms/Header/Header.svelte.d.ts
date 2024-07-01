import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IHeaderProps_ = typeof __propDef.props;
export type { IHeaderProps_ as IHeaderProps };
export type IHeaderEvents = typeof __propDef.events;
export type IHeaderSlots = typeof __propDef.slots;

export default class Header extends SvelteComponent<IHeaderProps, IHeaderEvents, IHeaderSlots> {}
