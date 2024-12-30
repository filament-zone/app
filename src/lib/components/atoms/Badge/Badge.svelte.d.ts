import { type ComponentType, SvelteComponent } from 'svelte';
import { EBadgeColorVariant, EBadgeWidthVariant } from '$lib/types';

declare const __propDef: {
	props: {
		label: string;
		colorVariant: EBadgeColorVariant;
		widthVariant: EBadgeWidthVariant;
		LeftContent?: ComponentType<SvelteComponent> | string | null;
		RightContent?: ComponentType<SvelteComponent> | string | null;
		textColor?: string;
		RightContentColorVariant?: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IBadgeProps_ = typeof __propDef.props;
export type { IBadgeProps_ as IBadgeProps };
export type IBadgeEvents = typeof __propDef.events;
export type IBadgeSlots = typeof __propDef.slots;

export default class Badge extends SvelteComponent<IBadgeProps, IBadgeEvents, IBadgeSlots> {}
