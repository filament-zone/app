import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		date: Date;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ITableDateTimeComponentProps_ = typeof __propDef.props;
export type { ITableDateTimeComponentProps_ as ITableDateTimeComponentProps };
export type ITableDateTimeComponentEvents = typeof __propDef.events;
export type ITableDateTimeComponentSlots = typeof __propDef.slots;

export default class TableDateTimeComponent extends SvelteComponent<
	ITableDateTimeComponentProps,
	ITableDateTimeComponentEvents,
	ITableDateTimeComponentSlots
> {}
