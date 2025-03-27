import type { Component } from 'svelte';

export interface IRightSideBarProps {
	closeOnClickOutside?: boolean;
	classNames?: string;
	children?: Snippet;
}

export declare const RightSidebar: Component<IRightSideBarProps>;
export default RightSidebar;
