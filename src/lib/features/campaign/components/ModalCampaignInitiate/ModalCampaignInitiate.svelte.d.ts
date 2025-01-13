import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IModalCampaignInitiateProps_ = typeof __propDef.props;
export type { IModalCampaignInitiateProps_ as IModalCampaignInitiateProps };
export type IModalCampaignInitiateEvents = typeof __propDef.events;
export type IModalCampaignInitiateSlots = typeof __propDef.slots;

export default class ModalCampaignInitiate extends SvelteComponent<
	IModalCampaignInitiateProps,
	IModalCampaignInitiateEvents,
	IModalCampaignInitiateSlots
> {}
