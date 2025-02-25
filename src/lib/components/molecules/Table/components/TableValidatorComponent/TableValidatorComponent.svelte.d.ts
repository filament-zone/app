import type { Component } from 'svelte';

export interface IDelegator {
	id: string;
	label: string;
	Icon: string;
}

export type ITableValidatorComponentProps = IDelegator;

export declare const TableValidatorComponent: Component<ITableValidatorComponentProps>;
export default TableValidatorComponent;
