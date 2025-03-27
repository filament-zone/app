import type { Component } from 'svelte';

export interface IListItemOption<T = string> {
	label: string;
	value: T;
	valueSecondary?: string;
	icon?: ComponentType<SvelteComponent> | string;
	disabled?: boolean;
	onclick?: () => void;
}

export interface IListItemProps {
	option: IListItemOption | null;
	selected?: boolean;
	isPlaceholder?: boolean;
	onclick?: () => void;
}

export declare const ListItem: Component<IListItemProps>;
export default ListItem;
