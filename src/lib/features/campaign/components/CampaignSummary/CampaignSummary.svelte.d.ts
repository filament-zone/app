import { SvelteComponent } from 'svelte';
import type { ICampaign } from '$lib/types';

declare const __propDef: {
	props: {
		campaign: ICampaign;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
	useTimeline: boolean;
};
type ICampaignSummaryProps_ = typeof __propDef.props;
export type { ICampaignSummaryProps_ as ICampaignSummaryProps };
export type ICampaignSummaryEvents = typeof __propDef.events;
export type ICampaignSummarySlots = typeof __propDef.slots;

export default class CampaignSummary extends SvelteComponent<
	ICampaignSummaryProps,
	ICampaignSummaryEvents,
	ICampaignSummarySlots
> {}
