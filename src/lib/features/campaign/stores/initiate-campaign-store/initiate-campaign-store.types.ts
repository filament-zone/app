import type { Writable } from 'svelte/store';
import type { ECampaignInitiateSelected } from '$lib/features/campaign/stores/initiate-campaign-store/initiate-campaign-store.enums';

export interface ICampaignInitiateItem {
	quantity: number;
	token: string;
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
