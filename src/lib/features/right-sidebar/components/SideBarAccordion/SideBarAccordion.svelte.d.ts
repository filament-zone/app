import type { Component, Snippet } from 'svelte';

export interface ISideBarAccordionProps {
	label: string;
	children: Snippet;
}

export declare const SideBarAccordion: Component<ISideBarAccordionProps>;
export default SideBarAccordion;
