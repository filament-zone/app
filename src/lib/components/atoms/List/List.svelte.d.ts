import { SvelteComponent } from 'svelte';
import { IListItemProps } from '$lib/types';

declare const __propDef: {
	props: {
		options: IListItemProps['option'][] | null;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IListProps_ = typeof __propDef.props;
export type { IListProps_ as IListProps };
export type IListEvents = typeof __propDef.events;
export type IListSlots = typeof __propDef.slots;

export default class List extends SvelteComponent<IListProps, IListEvents, IListSlots> {}
