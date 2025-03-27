import type { Component } from 'svelte';

export interface IPricingComponentProps {
	requiredLabel: string;
	dropdownValue: IDropdownProps['value'];
	dropdownOptions: IDropdownProps['options'];
	classNames?: string;
}

export declare const PricingComponent: Component<IPricingComponentProps, object, 'dropdownValue'>;
export default PricingComponent;
