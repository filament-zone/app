import type { Component } from 'svelte';
import type { EToggleSizeVariant } from '$lib/types';

export interface IToggleOption<T> {
	value: T;
	label: string;
	disabled?: boolean;
}

export interface IToggleProps<T> {
	options?: IToggleOption<T>[] | null;
	onChange?: ((value: T | T[]) => void) | null;
	label?: string;
	isMulti?: boolean;
	variant?: EToggleVariant;
	sizeVariant?: EToggleSizeVariant;
	value?: T | T[] | null;
}

export declare const Toggle: Component<IToggleProps<string>, object, 'value'>;
export default Toggle;
