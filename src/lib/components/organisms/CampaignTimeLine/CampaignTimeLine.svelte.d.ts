import { SvelteComponent } from 'svelte';
import { type ICampaign } from '$lib/types';

declare const __propDef: {
	props: {
		campaign: ICampaign | undefined;
		isOpen?: boolean;
		isCollapsable?: boolean;
		title?: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ICampaignTimeLineProps_ = typeof __propDef.props;
export type { ICampaignTimeLineProps_ as ICampaignTimeLineProps };
export type ICampaignTimeLineEvents = typeof __propDef.events;
export type ICampaignTimeLineSlots = typeof __propDef.slots;

export default class CampaignTimeLine extends SvelteComponent<
	ICampaignTimeLineProps,
	ICampaignTimeLineEvents,
	ICampaignTimeLineSlots
> {}
