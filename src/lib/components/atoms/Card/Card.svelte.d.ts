import type { Component, Snippet } from 'svelte';

export interface ICardProps {
	label: string;
	classNames: string;
	children?: Snippet;
}

export declare const Card: Component<ICardProps>;
export default Card;
