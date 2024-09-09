import { SvelteComponent } from 'svelte';
import type { ButtonColorVariantE } from '$lib/types';

declare const __propDef: {
	props: {
		description?: string;
		label: string;
		onButtonClick: () => void;
		buttonLabel?: string;
		buttonColorVariant?: ButtonColorVariantE;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ITemplateSegmentRightSideBarProps_ = typeof __propDef.props;
export type { ITemplateSegmentRightSideBarProps_ as ITemplateSegmentRightSideBarProps };
export type ITemplateSegmentRightSideBarEvents = typeof __propDef.events;
export type ITemplateSegmentRightSideBarSlots = typeof __propDef.slots;

export default class TemplateSegmentRightSidebar extends SvelteComponent<
	ITemplateSegmentRightSideBarProps,
	ITemplateSegmentRightSideBarEvents,
	ITemplateSegmentRightSideBarSlots
> {}
