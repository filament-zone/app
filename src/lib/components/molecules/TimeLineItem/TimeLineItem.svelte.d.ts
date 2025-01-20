import { SvelteComponent } from 'svelte';
import { ETimeLineItem } from '$lib/types';
import type { CampaignPhase } from '@filament-zone/filament/Phase';
declare const __propDef: {
	props: {
		iconStatus?: ETimeLineItem;
		title: string;
		description: string;
		date?: string | Date;
		status?: string;
		isLast?: boolean;
		isFirst?: boolean;
		onButtonClick?: (() => Promise<void> | void) | null;
		buttonLabel?: string | null;
		phase?: CampaignPhase;
		numericPhase?: number;
		isTimelineOpen?: boolean;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ITimeLineItemProps_ = typeof __propDef.props;
export type { ITimeLineItemProps_ as ITimeLineItemProps };
export type ITimeLineItemEvents = typeof __propDef.events;
export type ITimeLineItemSlots = typeof __propDef.slots;

export default class TimeLineItem extends SvelteComponent<
	ITimeLineItemProps,
	ITimeLineItemEvents,
	ITimeLineItemSlots
> {}
