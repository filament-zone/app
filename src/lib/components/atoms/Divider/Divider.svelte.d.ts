import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IDividerProps_ = typeof __propDef.props;
export type { IDividerProps_ as IDividerProps };
export type IDividerEvents = typeof __propDef.events;
export type IDividerSlots = typeof __propDef.slots;

export default class Divider extends SvelteComponent<
	IDividerProps,
	IDividerEvents,
	IDividerSlots
> {}
