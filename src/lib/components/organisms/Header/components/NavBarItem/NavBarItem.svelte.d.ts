import type { Component } from 'svelte';

export interface INavBarItemOption {
	label: string;
	value: string;
	path?: string | null;
	onClick?: () => void;
	subItems?: INavBarItemOption[];
}

export interface INavBarItemProps {
	option: INavBarItemOption;
}

export declare const NavBarItem: Component<INavBarItemProps>;
export default NavBarItem;
