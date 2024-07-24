import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		value: string;
		change: string;
		period: string;
		direction: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ITrendDisplayProps_ = typeof __propDef.props;
export type { ITrendDisplayProps_ as ITrendDisplayProps };
export type ITrendDisplayEvents = typeof __propDef.events;
export type ITrendDisplaySlots = typeof __propDef.slots;

export default class TrendDisplay extends SvelteComponent<
	ITrendDisplayProps,
	ITrendDisplayEvents,
	ITrendDisplaySlots
> {}
