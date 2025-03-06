import type { Component } from 'svelte';

export interface IListProps {
	options: IListItemProps['option'][] | null;
	onclick?: () => void;
}

export declare const List: Component<IListProps>;
export default List;
