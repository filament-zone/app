import type { Component } from 'svelte';
import { IStepBarCampaignOption } from '$lib/types';

export interface IStepBarCampaignButtonProps {
	step: IStepBarCampaignOption;
	contextId?: string;
}

export declare const StepBarCampaignButton: Component<IStepBarCampaignButtonProps>;
export default StepBarCampaignButton;
