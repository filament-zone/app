import { type ComponentType, SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		Icon: ComponentType<SvelteComponent>;
		label: string;
		ticker: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ITableNetworkComponentProps_ = typeof __propDef.props;
export type { ITableNetworkComponentProps_ as ITableNetworkComponentProps };
export type ITableNetworkComponentEvents = typeof __propDef.events;
export type ITableNetworkComponentSlots = typeof __propDef.slots;

export default class TableNetworkComponent extends SvelteComponent<
	ITableNetworkComponentProps,
	ITableNetworkComponentEvents,
	ITableNetworkComponentSlots
> {}
