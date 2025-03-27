import type { Component } from 'svelte';
import { type IInputProps } from '$lib/types';

export interface IInputTokenFieldProps {
	onChange?: IInputProps['onInput'];
	onMaxClick?: () => void;
	inputProps?: IInputProps;
	tokenProps: ITokenIconNameContainerProps;
}

export declare const InputTokenField: Component<IInputTokenFieldProps>;
export default InputTokenField;
