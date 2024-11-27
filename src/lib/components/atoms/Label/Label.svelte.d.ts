import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		value: string;
		tooltipContent?: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ILabelProps_ = typeof __propDef.props;
export type { ILabelProps_ as ILabelProps };
export type ILabelEvents = typeof __propDef.events;
export type ILabelSlots = typeof __propDef.slots;

export default class Label extends SvelteComponent<ILabelProps, ILabelEvents, ILabelSlots> {}
