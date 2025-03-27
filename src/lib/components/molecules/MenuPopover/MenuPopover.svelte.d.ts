import type { Component } from 'svelte';

export interface IMenuPopoverProps {
	isOpen?: Writable<boolean>;
	width?: string;
	top?: string;
	maxHeight?: string;
	trigger?: Snippet;
	content?: Snippet;
}

export declare const MenuPopover: Component<IMenuPopoverProps>;
export default MenuPopover;
