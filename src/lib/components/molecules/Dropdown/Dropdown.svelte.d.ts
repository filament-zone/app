import { type ComponentType, SvelteComponent } from 'svelte';

export interface IDropdownOption<T = string> {
	label: string;
	value: T;
	valueSecondary?: string;
	icon?: ComponentType<SvelteComponent> | string;
	disabled?: boolean;
}

declare const __propDef: {
	props: {
		label?: string;
		value?: IDropdownOption['value'] | IDropdownOption['value'][] | null;
		options?: IDropdownOption[];
		onChange?: (value: IDropdownProps['value'] | null) => void;
		fullWidth?: boolean;
		classNames?: string;
		sizeVariant?: EDropdownSizeVariant;
		placeholder?: string;
		isSearchable?: boolean;
		isCreatable?: boolean;
		isMulti?: boolean;
		displaySelectedValues?: boolean;
		disabled?: boolean;
		leftLabel?: string;
		valueColor?: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IDropdownProps_ = typeof __propDef.props;
export type { IDropdownProps_ as IDropdownProps };
export type IDropdownEvents = typeof __propDef.events;
export type IDropdownSlots = typeof __propDef.slots;

export default class Dropdown extends SvelteComponent<
	IDropdownProps,
	IDropdownEvents,
	IDropdownSlots
> {}

export * from './components/SelectedItemMulti/SelectedItemMulti.svelte';
