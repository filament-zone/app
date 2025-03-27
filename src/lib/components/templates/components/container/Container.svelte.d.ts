import type { Component } from 'svelte';

export interface IContainerProps {
	label?: string;
	variant?: string;
	classNames?: string;
	header?: Snippet;
	aboveContainer?: Snippet;
	children: Snippet;
}

export declare const Container: Component<IContainerProps>;
export default Container;
