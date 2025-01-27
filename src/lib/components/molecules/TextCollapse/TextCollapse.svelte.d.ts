import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		isOpen: boolean;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: {
		label: object;
		body: object;
	};
};
type ITextCollapseProps_ = typeof __propDef.props;
export type { ITextCollapseProps_ as ITextCollapseProps };
export type ITextCollapseEvents = typeof __propDef.events;
export type ITextCollapseSlots = typeof __propDef.slots;

export default class TextCollapse extends SvelteComponent<
	ITextCollapseProps,
	ITextCollapseEvents,
	ITextCollapseSlots
> {}
