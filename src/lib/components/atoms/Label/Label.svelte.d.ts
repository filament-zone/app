import type { Component } from 'svelte';

export interface ILabelProps {
	value: string;
	tooltipContent?: string;
}

export declare const Label: Component<ILabelProps>;
export default Label;
