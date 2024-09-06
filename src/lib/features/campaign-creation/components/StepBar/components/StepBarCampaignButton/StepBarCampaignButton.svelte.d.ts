import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent<unknown>;
	};
	slots: object;
};

type IStepBarCampaignButtonProps_ = typeof __propDef.props;
export type { IStepBarCampaignButtonProps_ as IStepBarCampaignButtonProps };
export type IStepBarCampaignButtonEvents = typeof __propDef.events;
export type IStepBarCampaignButtonSlots = typeof __propDef.slots;

export default class StepBarCampaignButton extends SvelteComponent<
	IStepBarCampaignButtonProps,
	IStepBarCampaignButtonEvents,
	IStepBarCampaignButtonSlots
> {}
