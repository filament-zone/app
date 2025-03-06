import type { Component } from 'svelte';
import type { Snippet } from 'svelte';

export type TTypographyVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'subtitle1'
	| 'subtitle2'
	| 'body1'
	| 'body2'
	| 'caption'
	| 'overline'
	| 'labelSmall'
	| 'button'
	| 'badge'
	| 'toggle'
	| 'cardDate';

export interface ITypographyProps {
	variant?: TTypographyVariant;
	color?: string;
	styles?: string;
	dataTestId?: string;
	weight?: number;
	allowHover?: boolean;
	classNames?: string;
	children: Snippet;
}

export declare const Typography: Component<ITypographyProps>;
export default Typography;
