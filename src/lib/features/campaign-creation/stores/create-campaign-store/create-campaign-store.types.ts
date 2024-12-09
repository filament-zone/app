import type { Writable } from 'svelte/store';
import { type ICampaign, type IDelegate } from '$lib/types';

export interface ICampaignStore {
	campaignDetails: Writable<ICampaign>;
	clearCampaignDetails: () => void;
	createCampaign: () => Promise<boolean>;
	toggleDelegate: (delegateId: IDelegate['id']) => void;
	initiateCampaign: (campaign: ICampaign) => void;
	depositToCampaign: (campaign: ICampaign) => void;
	setTokenAllowance: () => void;
	createHubTx: (msg: object) => () => Promise<void>;
	sendTestHubTx: () => Promise<void>;
	getDelegates: () => void;
}
