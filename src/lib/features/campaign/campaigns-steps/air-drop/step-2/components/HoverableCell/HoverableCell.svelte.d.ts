import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		id: string;
		isCompleted: boolean;
		isSettingsCircleGreen: boolean;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IHoverableCellProps_ = typeof __propDef.props;
export type { IHoverableCellProps_ as IHoverableCellProps };
export type IHoverableCellEvents = typeof __propDef.events;
export type IHoverableCellSlots = typeof __propDef.slots;

export default class HoverableCell extends SvelteComponent<
	IHoverableCellProps,
	IHoverableCellEvents,
	IHoverableCellSlots
> {}
