import type { Component } from 'svelte';

export interface IAddContractInputProps {
	contracts?: IContract[];
	displayOnly?: boolean;
	direction?: 'row' | 'col';
	label?: string;
}

export declare const AddContractInput: Component<IAddContractInputProps>;
export default AddContractInput;
