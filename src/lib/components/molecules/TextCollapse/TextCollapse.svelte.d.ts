import type { Component, Snippet } from 'svelte';

export interface ITextCollapseProps {
	label?: Snippet;
	children?: Snippet;
}

export declare const TextCollapse: Component<ITextCollapseProps>;
export default TextCollapse;
