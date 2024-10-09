import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IModalCampaignDepositTimelineProps_ = typeof __propDef.props;
export type { IModalCampaignDepositTimelineProps_ as IModalCampaignDepositTimelineProps };
export type IModalCampaignDepositTimelineEvents = typeof __propDef.events;
export type IModalCampaignDepositTimelineSlots = typeof __propDef.slots;

export default class ModalCampaignDepositTimeline extends SvelteComponent<
	IModalCampaignDepositTimelineProps,
	IModalCampaignDepositTimelineEvents,
	IModalCampaignDepositTimelineSlots
> {}
