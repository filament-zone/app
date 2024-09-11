import type { Writable } from 'svelte/store';
import type { ICampaign, IDelegate } from '$lib/types';

export enum EDelegateType {
	ACTIVE = 'ACTIVE',
	EVICTED = 'EVICTED'
}

export interface ICampaignStore {
	campaignDetails: Writable<ICampaign>;
	clearCampaignDetails: () => void;
	createCampaign: () => boolean;
	toggleDelegate: (delegateId: IDelegate['id'], delegateType: EDelegateType) => void;
}
