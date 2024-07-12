import type { SvelteComponent } from 'svelte';

export interface INavBarItemOption {
	label: string;
	value: string;
	path?: string | null;
	onClick?: () => void;
	subItems?: INavBarItemOption[];
}

declare const __propDef: {
	props: { option: INavBarItemOption };
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};

type INavBarItemProps_ = typeof __propDef.props;
export type { INavBarItemProps_ as INavBarItemProps };
export type INavBarItemEvents = typeof __propDef.events;
export type INavBarItemSlots = typeof __propDef.slots;

export default class NavBarItem extends SvelteComponent<
	INavBarItemProps,
	INavBarItemEvents,
	INavBarItemSlots
> {}
