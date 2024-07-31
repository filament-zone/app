import { SvelteComponent } from 'svelte';
import { IInputProps, IDropdownProps } from '$lib/types';

declare const __propDef: {
	props: {
		value?: {
			inputValue: IInputProps['value'];
			dropdownValue: IDropdownProps['value'];
		};
		onChange?: (value: ISearchSelectProps['value']) => void;
		inputProps?: IInputProps;
		dropdownProps?: IDropdownProps;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ISearchSelectProps_ = typeof __propDef.props;
export type { ISearchSelectProps_ as ISearchSelectProps };
export type ISearchSelectEvents = typeof __propDef.events;
export type ISearchSelectSlots = typeof __propDef.slots;

export default class SearchSelect extends SvelteComponent<
	ISearchSelectProps,
	ISearchSelectEvents,
	ISearchSelectSlots
> {}
