import { SvelteComponent } from 'svelte';
import { IDropdownProps } from '$lib/types';

declare const __propDef: {
	props: {
		label: string;
		requiredLabel: string;
		dropdownValue: IDropdownProps['value'];
		dropdownOptions: IDropdownProps['options'];
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IPricingComponentProps_ = typeof __propDef.props;
export type { IPricingComponentProps_ as IPricingComponentProps };
export type IPricingComponentEvents = typeof __propDef.events;
export type IPricingComponentSlots = typeof __propDef.slots;

export default class PricingComponent extends SvelteComponent<
	IPricingComponentProps,
	IPricingComponentEvents,
	IPricingComponentSlots
> {}
