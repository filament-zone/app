import type { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IMetricsProps_<T = string> = typeof __propDef.props<T>;
export type { IMetricsProps_ as IMetricsProps };
export type IMetricsEvents = typeof __propDef.events;
export type IMetricsSlots = typeof __propDef.slots;

export default class Metrics extends SvelteComponent<
	IMetricsProps<T>,
	IMetricsEvents,
	IMetricsSlots
> {}
