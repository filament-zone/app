import type { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		closeOnClickOutside?: boolean;
		classNames?: string;
	};

	events: {
		[evt: string]: CustomEvent<unknown>;
	};
	slots: object;
};
type IRightSideBarProps_ = typeof __propDef.props;
export type { IRightSideBarProps_ as IRightSideBarProps };
export type IRightSideBarEvents = typeof __propDef.events;
export type IRightSideBarSlots = typeof __propDef.slots;

export default class RightSidebar extends SvelteComponent<
	IRightSideBarProps,
	IRightSideBarEvents,
	IRightSideBarSlots
> {}
