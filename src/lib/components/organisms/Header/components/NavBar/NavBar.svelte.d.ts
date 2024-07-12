import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type INavBarProps_ = typeof __propDef.props;
export type { INavBarProps_ as INavBarProps };
export type INavBarEvents = typeof __propDef.events;
export type INavBarSlots = typeof __propDef.slots;

export default class NavBar extends SvelteComponent<INavBarProps, INavBarEvents, INavBarSlots> {}
