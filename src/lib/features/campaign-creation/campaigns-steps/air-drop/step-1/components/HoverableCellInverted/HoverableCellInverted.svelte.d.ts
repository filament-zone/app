import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		id: string;
		isSelected: boolean;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IHoverableCellInvertedProps_ = typeof __propDef.props;
export type { IHoverableCellInvertedProps_ as IHoverableCellInvertedProps };
export type IHoverableCellInvertedEvents = typeof __propDef.events;
export type IHoverableCellInvertedSlots = typeof __propDef.slots;

export default class HoverableCellInverted extends SvelteComponent<
	IHoverableCellInvertedProps,
	IHoverableCellInvertedEvents,
	IHoverableCellInvertedSlots
> {}
