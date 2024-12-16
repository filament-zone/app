import type { Writable } from 'svelte/store';

export interface ICampaignInitiateItem {
	quantity: number;
	token: string;
}

export enum ECampaignInitiateSelected {
	isPayNow = 'isPayNow',
	isBond = 'isBond'
}

export interface ICampaignInitiateState {
	selected: ECampaignInitiateSelected;
	isPayNow: ICampaignInitiateItem;
	isBond: ICampaignInitiateItem;
}

export interface IInitiateCampaignStore {
	campaignInitiateState: Writable<ICampaignInitiateState>;
	signTokenAllowance: () => void;
	signDepositTransaction: () => void;
	hubConfirm: () => void;
}
