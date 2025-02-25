import type { Component } from 'svelte';
import { IInputProps, IDropdownProps } from '$lib/types';

export interface ISearchSelectProps {
	value?: {
		inputValue: IInputProps['value'];
		dropdownValue: IDropdownProps['value'];
	};

	onChange?: (value: ISearchSelectProps['value']) => void;
	inputProps?: IInputProps;
	dropdownProps?: IDropdownProps;
}

export declare const SearchSelect: Component<ISearchSelectProps>;
export default SearchSelect;
