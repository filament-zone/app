import { type ComponentType, SvelteComponent } from 'svelte';

export interface IListItemOption<T = string> {
	label: string;
	value: T;
	valueSecondary?: string;
	icon?: ComponentType<SvelteComponent> | string;
	disabled?: boolean;
	onClick?: () => void;
}

declare const __propDef: {
	props: {
		option: IListItemOption | null;
		selected?: boolean;
		isPlaceholder?: boolean;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IListItemProps_ = typeof __propDef.props;
export type { IListItemProps_ as IListItemProps };
export type IListItemEvents = typeof __propDef.events;
export type IListItemSlots = typeof __propDef.slots;

export default class ListItem extends SvelteComponent<
	IListItemProps,
	IListItemEvents,
	IListItemSlots
> {}
