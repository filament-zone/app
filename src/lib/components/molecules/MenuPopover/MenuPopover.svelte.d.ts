import type { Writable } from 'svelte/store';
import type { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		isOpen: Writable<boolean>;
		width?: string;
		top?: string;
		maxHeight?: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: {
		trigger: object;
		content: object;
	};
};
type IMenuPopoverProps_ = typeof __propDef.props;
export type { IMenuPopoverProps_ as IMenuPopoverProps };
export type IMenuPopoverEvents = typeof __propDef.events;
export type IMenuPopoverSlots = typeof __propDef.slots;

export default class MenuPopover extends SvelteComponent<
	IMenuPopoverProps,
	IMenuPopoverEvents,
	IMenuPopoverSlots
> {}
