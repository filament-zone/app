import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IModalCampaignDepositProps_ = typeof __propDef.props;
export type { IModalCampaignDepositProps_ as IModalCampaignDepositProps };
export type IModalCampaignDepositEvents = typeof __propDef.events;
export type IModalCampaignDepositSlots = typeof __propDef.slots;

export default class ModalCampaignDeposit extends SvelteComponent<
	IModalCampaignDepositProps,
	IModalCampaignDepositEvents,
	IModalCampaignDepositSlots
> {}
