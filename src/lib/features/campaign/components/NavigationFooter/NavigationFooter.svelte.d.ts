import type { Component } from 'svelte';

export interface INavigationFooterProps {
	handleNext?: () => Promise<boolean> | void;
	handleBack?: () => void;
	disabled?: boolean;
}

export declare const NavigationFooter: Component<INavigationFooterProps>;
export default NavigationFooter;
