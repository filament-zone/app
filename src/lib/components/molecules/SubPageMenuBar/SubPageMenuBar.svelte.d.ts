import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		subPages: Record<string, string | Record<string, string>>;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ISubPageMenuBarProps_ = typeof __propDef.props;
export type { ISubPageMenuBarProps_ as ISubPageMenuBarProps };
export type ISubPageMenuBarEvents = typeof __propDef.events;
export type ISubPageMenuBarSlots = typeof __propDef.slots;

export default class SubPageMenuBar extends SvelteComponent<
	ISubPageMenuBarProps,
	ISubPageMenuBarEvents,
	ISubPageMenuBarSlots
> {}
