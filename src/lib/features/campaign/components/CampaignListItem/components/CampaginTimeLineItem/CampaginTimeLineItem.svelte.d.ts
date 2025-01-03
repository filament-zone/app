import { SvelteComponent } from 'svelte';
import { ECampaignTimeLineItem } from '$lib/types';

declare const __propDef: {
	props: {
		iconStatus: ECampaignTimeLineItem;
		title: string;
		description: string;
		date?: string;
		status?: string;
		isLast?: boolean;
		isFirst?: boolean;
		onButtonClick?: () => void;
		buttonLabel?: string;
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
