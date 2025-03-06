import type { Component } from 'svelte';

export interface ITableNetworkComponentProps {
	Icon: Component;
	label: string;
	ticker: string;
}

export declare const TableNetworkComponent: Component<ITableNetworkComponentProps>;
export default TableNetworkComponent;
