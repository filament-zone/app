import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IModalCampaignVoteProps_ = typeof __propDef.props;
export type { IModalCampaignVoteProps_ as IModalCampaignVoteProps };
export type IModalCampaignVoteEvents = typeof __propDef.events;
export type IModalCampaignVoteSlots = typeof __propDef.slots;

export default class ModalCampaignVote extends SvelteComponent<
	IModalCampaignVoteProps,
	IModalCampaignVoteEvents,
	IModalCampaignVoteSlots
> {}
