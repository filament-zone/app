import { SvelteComponent } from 'svelte';
import { ECampaignPhase } from '$lib/api/campaign/campaign.hub.api.types';
declare const __propDef: {
	props: {
		title: string;
		description: string;
		date?: string | Date;
		status?: string;
		isLast?: boolean;
		isFirst?: boolean;
		onButtonClick?: (() => Promise<void> | void) | null;
		buttonLabel?: string | null;
		phase?: ECampaignPhase;
		numericPhase?: number;
		isExpanded?: boolean;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ICampaignTimeLineItemProps_ = typeof __propDef.props;
export type { ICampaignTimeLineItemProps_ as ICampaignTimeLineItemProps };
export type ICampaignTimeLineItemEvents = typeof __propDef.events;
export type ICampaignTimeLineItemSlots = typeof __propDef.slots;

export default class CampaignTimeLineItem extends SvelteComponent<
	ICampaignTimeLineItemProps,
	ICampaignTimeLineItemEvents,
	ICampaignTimeLineItemSlots
> {}
