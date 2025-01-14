import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IModalCampaignInitiateTimelineProps_ = typeof __propDef.props;
export type { IModalCampaignInitiateTimelineProps_ as IModalCampaignInitiateTimelineProps };
export type IModalCampaignInitiateTimelineEvents = typeof __propDef.events;
export type IModalCampaignInitiateTimelineSlots = typeof __propDef.slots;

export default class ModalCampaignInitiateTimeline extends SvelteComponent<
	IModalCampaignInitiateTimelineProps,
	IModalCampaignInitiateTimelineEvents,
	IModalCampaignInitiateTimelineSlots
> {}
