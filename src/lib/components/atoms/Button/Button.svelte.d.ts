import type { HTMLButtonAttributes } from 'svelte/elements';
import { type Component, type Snippet } from 'svelte';
import { EButtonSizeVariant, EButtonStyleVariant } from '$lib/types';

export interface IButtonProps extends HTMLButtonAttributes {
	sizeVariant?: EButtonSizeVariant;
	styleVariant?: EButtonStyleVariant;
	LeftContent?: Component | null;
	children?: Snippet;
	classNames?: string;
}

export declare const Button: Component<IButtonProps>;
export default Button;
