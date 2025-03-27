import type { Component } from 'svelte';

export interface IDelegator {
	id: string;
	label: string;
	Icon: Component;
}

export type ITableValidatorComponentProps = IDelegator;

export declare const TableValidatorComponent: Component<ITableValidatorComponentProps>;
export default TableValidatorComponent;
