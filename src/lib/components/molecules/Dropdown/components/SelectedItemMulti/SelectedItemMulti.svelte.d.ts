import { SvelteComponent } from 'svelte';
import type { IDropdownOption } from '$lib/types';

declare const __propDef: {
	props: {
		option: IDropdownOption;
		displayOnly?: boolean;
		onCloseIconClick: () => void;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};

type ISelectedItemMultiProps_ = typeof __propDef.props;
export type { ISelectedItemMultiProps_ as ISelectedItemMultiProps };
export type ISelectedItemMultiEvents = typeof __propDef.events;
export type ISelectedItemMultiSlots = typeof __propDef.slots;

export default class SelectedItemMulti extends SvelteComponent<
	ISelectedItemMultiProps,
	ISelectedItemMultiEvents,
	ISelectedItemMultiSlots
> {}
