import type { Writable } from 'svelte/store';
import { type ICampaign, type IDelegate } from '$lib/types';

export interface ICampaignStore {
	campaignDetails: Writable<ICampaign>;
	clearCampaignDetails: () => void;
	createCampaign: () => boolean;
	toggleDelegate: (delegateId: IDelegate['id']) => void;
	initiateCampaign: (campaign: ICampaign) => void;
	depositToCampaign: (campaign: ICampaign) => void;
	setTokenAllowance: () => void;
	createHubTx: () => void;
}
