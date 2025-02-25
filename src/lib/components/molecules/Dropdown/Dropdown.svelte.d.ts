import type { Component } from 'svelte';

export interface IDropdownOption<T = string> {
	label: string;
	value: T;
	valueSecondary?: string;
	icon?: Component | string;
	disabled?: boolean;
}

export interface IDropdownProps {
	label?: string;
	value?: IDropdownOption['value'] | IDropdownOption['value'][] | null;
	options?: IDropdownOption[];
	onChange?: (value: IDropdownProps['value'] | null) => void;
	fullWidth?: boolean;
	sizeVariant?: EDropdownSizeVariant;
	placeholder?: string;
	isSearchable?: boolean;
	isCreatable?: boolean;
	isMulti?: boolean;
	displaySelectedValues?: boolean;
	disabled?: boolean;
	leftLabel?: string;
	valueColor?: string;
	classNames?: string;
	styles?: string;
}

export declare const Dropdown: Component<DropdownProps>;
export default Dropdown;

export * from './components/SelectedItemMulti/SelectedItemMulti.svelte';
