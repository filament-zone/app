import type { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		name: string | null;
		date: string | null;
		status: string | null;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ITickerProps_<T = string> = typeof __propDef.props<T>;
export type { ITickerProps_ as ITickerProps };
export type ITickerEvents = typeof __propDef.events;
export type ITickerSlots = typeof __propDef.slots;

export default class Ticker extends SvelteComponent<ITickerProps<T>, ITickerEvents, ITickerSlots> {}
