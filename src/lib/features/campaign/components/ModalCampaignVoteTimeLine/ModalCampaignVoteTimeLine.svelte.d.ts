import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IModalCampaignVoteTimeLineProps_ = typeof __propDef.props;
export type { IModalCampaignVoteTimeLineProps_ as IModalCampaignVoteTimeLineProps };
export type IModalCampaignVoteTimeLineEvents = typeof __propDef.events;
export type IModalCampaignVoteTimeLineSlots = typeof __propDef.slots;

export default class ModalCampaignVoteTimeLine extends SvelteComponent<
	IModalCampaignVoteTimeLineProps,
	IModalCampaignVoteTimeLineEvents,
	IModalCampaignVoteTimeLineSlots
> {}
