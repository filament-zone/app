import type { HTMLInputAttributes } from 'svelte/elements';
import type { Component } from 'svelte';

export interface IInputProps extends HTMLInputAttributes {
	label?: string | null;
	labelGap?: boolean;
	error?: string;
	sizeVariant?: EInputSizeVariant;
	readonly?: boolean;
	RightIcon?: Component | string | null;
	RightIconProps?: object;
	LeftContent?: Component | string | null;
	colorVariant?: EInputColorVariant;
	onInput?: (e: Event<HTMLInputElement>) => void;
	hideLeftBorder?: boolean;
	classNames?: string;
	textColor?: string;
	tooltipContent?: string;
	styles?: string;
	placeholder?: string;
	onclick?: () => void;
}

export declare const Input: Component<IInputProps, object, 'value'>;
export default Input;
