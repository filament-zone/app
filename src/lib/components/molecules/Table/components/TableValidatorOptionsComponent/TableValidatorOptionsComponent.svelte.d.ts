import type { Component } from 'svelte';
import { IListProps } from '$lib/types';

export interface ITableValidatorOptionsComponentProps {
	buttonOnClick?: () => void;
	buttonLabel: string;
	options?: IListProps['options'];
	disabled?: boolean;
}

export declare const TableValidatorOptionsComponent: Component<ITableValidatorOptionsComponentProps>;
export default TableValidatorOptionsComponent;
