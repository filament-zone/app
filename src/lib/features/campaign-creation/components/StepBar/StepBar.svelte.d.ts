import { SvelteComponent } from 'svelte';
import { ECampaignType } from '$lib/features/campaign/campaign.enums';

export interface IStepBarCampaignOption {
	value: number;
	label: string;
	description: string | null;
	isActive: boolean;
	isCompleted: boolean;
}

export type TStepBarConfig = Record<
	ECampaignType,
	{ label: string; steps: IStepBarCampaignOption[] }
>;

declare const __propDef: {
	props: {
		contextId?: string;
	};
	events: {
		[evt: string]: CustomEvent<unknown>;
	};
	slots: object;
};

type IStepBarProps_ = typeof __propDef.props;
export type { IStepBarProps_ as IStepBarProps };
export type IStepBarEvents = typeof __propDef.events;
export type IStepBarSlots = typeof __propDef.slots;

export default class StepBar extends SvelteComponent<
	IStepBarProps,
	IStepBarEvents,
	IStepBarSlots
> {}
