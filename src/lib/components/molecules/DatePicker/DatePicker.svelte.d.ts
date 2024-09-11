import { SvelteComponent } from 'svelte';
import { ICalendarProps } from '$lib/types';

declare const __propDef: {
	props: {
		value: ICalendarProps<T>['value'];
		onChange: ICalendar<T>['onChange'];
		label: ICalendarProps<T>['label'];
		inputLabel?: string;
		position?: 'left' | string;
		closeOnClickOutside?: boolean;
	};
	events: {
		[evt: string]: CustomEvent<unknown>;
	};
	slots: object;
};

type IDatePickerProps_<T> = typeof __propDef.props & {
	value: ICalendarProps<T>['value'];
	onChange: ICalendarProps<T>['onChange'];
	label: ICalendarProps<T>['label'];
};
export type { IDatePickerProps_ as IDatePickerProps };
export type IDatePickerEvents = typeof __propDef.events;
export type IDatePickerSlots = typeof __propDef.slots;

export default class DatePicker extends SvelteComponent<
	IDatePickerProps<T>,
	IDatePickerEvents,
	IDatePickerSlots
> {}
