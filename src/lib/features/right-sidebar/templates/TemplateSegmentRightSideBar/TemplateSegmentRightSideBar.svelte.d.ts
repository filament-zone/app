import type { Component } from 'svelte';

export interface ITemplateSegmentRightSideBarProps {
	description?: string;
	label: string;
	onButtonClick: () => void;
	buttonLabel?: string;
	buttonColorVariant?: ButtonColorVariantE;
	children?: Snippet;
}

export declare const TemplateSegmentRightSidebar: Component<ITemplateSegmentRightSideBarProps>;
export default TemplateSegmentRightSidebar;
