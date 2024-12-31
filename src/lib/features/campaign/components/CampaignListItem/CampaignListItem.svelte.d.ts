import { SvelteComponent } from 'svelte';
import type { ICampaign } from '$lib/types';

declare const __propDef: {
	props: {
		campaign: ICampaign;
		isOwner?: boolean;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ICampaignListItemProps_ = typeof __propDef.props;
export type { ICampaignListItemProps_ as ICampaignListItemProps };
export type ICampaignListItemEvents = typeof __propDef.events;
export type ICampaignListItemSlots = typeof __propDef.slots;

export default class CampaignListItem extends SvelteComponent<
	ICampaignListItemProps,
	ICampaignListItemEvents,
	ICampaignListItemSlots
> {}
