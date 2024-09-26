import { SvelteComponent } from 'svelte';
import { type ICampaign, ECampaignTimeLineItem } from '$lib/types';

declare const __propDef: {
	props: {
		campaign: ICampaign;
		iconStatus: ECampaignTimeLineItem;
		title: string;
		description: string;
		date: string;
		status: string;
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
