// import { SvelteComponent } from 'svelte';
// import type moment from 'moment/moment';
// import { CalendarMode, type ICalendarRangedValue, type ICalendarSingleValue } from '$lib/types';
//
// export interface ICalendarSingleValue {
// 	date: string | null;
// }
//
// export interface ICalendarRangedValue {
// 	start: string | null;
// 	end: string | null;
// }
//
// declare const __propDef: {
// 	props: {
// 		mode: Mode;
// 		value: Mode extends CalendarMode.SINGLE ? ICalendarSingleValue : ICalendarRangedValue;
// 		onChange: ((value: ICalendarProps<Mode>['value']) => void) | null;
// 		displayDayOfWeek?: boolean;
// 		monthToRender: moment.Moment;
// 		label?: string;
// 	};
// 	events: {
// 		[evt: string]: CustomEvent<unknown>;
// 	};
// 	slots: object;
// };
//
// type ICalendarProps_<Mode extends CalendarMode> = typeof __propDef.props & {
// 	mode: Mode;
// 	value: Mode extends CalendarMode.SINGLE ? ICalendarSingleValue : ICalendarRangedValue;
// };
// export type { ICalendarProps_ as ICalendarProps };
// export type ICalendarEvents = typeof __propDef.events;
// export type ICalendarSlots = typeof __propDef.slots;
//
// export default class Calendar<Mode> extends SvelteComponent<
// 	ICalendarProps<Mode>,
// 	ICalendarEvents,
// 	ICalendarSlots
// > {}

import type { Component } from 'svelte';
import { CalendarMode } from '$lib/types';

export interface IDatePickerProps<T> {
	value?: ICalendarProps<T>['value'];
	onChange: ICalendarProps<T>['onChange'];
	label: ICalendarProps<T>['label'];
	disabled: ICalendarProps<T>['disabled'];
	inputLabel?: string;
	position?: 'left' | string;
	closeOnClickOutside?: boolean;
}

export declare const DatePicker: Component<ICalendarProps<CalendarMode.SINGLE>>;
export default DatePicker;
