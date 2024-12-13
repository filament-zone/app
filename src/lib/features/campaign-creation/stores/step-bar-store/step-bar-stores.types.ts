import type { Readable, Writable } from 'svelte/store';
import type { IStepBarCampaignOption } from '$lib/types';

export interface IStepBarStore {
	steps: Writable<IStepBarCampaignOption[]>;
	currentStep: Writable<number>;
	setCurrentStep: (value: IStepBarCampaignOption['value']) => void;
	nextStep: () => void;
	isLastStep: Readable<boolean>;
	isPreLastStep: Readable<boolean>;
	validateCurrentStep: () => Promise<boolean>;
}
