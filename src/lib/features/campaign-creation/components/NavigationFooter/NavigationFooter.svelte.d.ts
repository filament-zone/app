import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		handleNext?: () => Promise<boolean> | void;
		handleDraft?: () => void;
		handleBack?: () => void;
		disabled?: boolean;
	};
	events: {
		[evt: string]: CustomEvent<unknown>;
	};
	slots: object;
};
type INavigationFooterProps_ = typeof __propDef.props;
export type { INavigationFooterProps_ as INavigationFooterProps };
export type INavigationFooterEvents = typeof __propDef.events;
export type INavigationFooterSlots = typeof __propDef.slots;

export default class NavigationFooter extends SvelteComponent<
	INavigationFooterProps,
	INavigationFooterEvents,
	INavigationFooterSlots
> {}
