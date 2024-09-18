import type { Writable } from 'svelte/store';
import { EDelegateType, type ICampaign, type IDelegate } from '$lib/types';

export interface ICampaignStore {
	campaignDetails: Writable<ICampaign>;
	clearCampaignDetails: () => void;
	createCampaign: () => boolean;
	toggleDelegate: (delegateId: IDelegate['id'], delegateType: EDelegateType) => void;
	createHubTx: () => void;
}
