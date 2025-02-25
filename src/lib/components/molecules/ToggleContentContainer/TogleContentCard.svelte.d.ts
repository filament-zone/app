import type { Component, Snippet } from 'svelte';

export interface IToggleContentCardProps {
	label?: Snippet;
	content?: Snippet;
}

export declare const ToggleContentCard: Component<IToggleContentCardProps>;
export default ToggleContentCard;
