import type { Component } from 'svelte';

export interface ISubPageMenuBarProps {
	subPages: Record<string, string | Record<string, string>>;
}

export declare const SubPageMenuBar: Component<ISubPageMenuBarProps>;
export default SubPageMenuBar;
