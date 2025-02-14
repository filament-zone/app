import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		label: string;
		variant: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: {
		header: object;
		['above-container']: object;
	};
};
type IContainerProps_ = typeof __propDef.props;
export type { IContainerProps_ as IContainerProps };
export type IContainerEvents = typeof __propDef.events;
export type IContainerSlots = typeof __propDef.slots;

export default class Container extends SvelteComponent<
	IContainerProps,
	IContainerEvents,
	IContainerSlots
> {}
