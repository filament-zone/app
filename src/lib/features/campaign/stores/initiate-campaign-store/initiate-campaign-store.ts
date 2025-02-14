import { writable } from 'svelte/store';
import { type ICampaignInitiateState, type IInitiateCampaignStore } from '$lib/types';
import { ECampaignInitiateSelected } from '$lib/features/campaign/stores/initiate-campaign-store/initiate-campaign-store.enums';

const initCampaignInitiateState: ICampaignInitiateState = {
	selected: ECampaignInitiateSelected.isPayNow,
	isPayNow: {
		quantity: 0,
		token: 'usdt'
	},
	isBond: {
		quantity: 0,
		token: 'bFila'
	}
};

const campaignInitiateState = writable({ ...initCampaignInitiateState });

const signTokenAllowance: IInitiateCampaignStore['signTokenAllowance'] = () => {
	console.log('signTokenAllowance');
};
const signDepositTransaction: IInitiateCampaignStore['signDepositTransaction'] = () => {
	console.log('signDepositTransaction');
};
const hubConfirm: IInitiateCampaignStore['hubConfirm'] = () => {
	console.log('hubConfirm');
};

export const initiateCampaignStore: IInitiateCampaignStore = {
	campaignInitiateState,
	signTokenAllowance,
	signDepositTransaction,
	hubConfirm
};
