import type { Component } from 'svelte';
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

export interface IStepBarProps {
	contextId?: string;
}

export declare const StepBar: Component<IStepBarProps>;
export default StepBar;
