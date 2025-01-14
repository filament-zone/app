import type { Writable } from 'svelte/store';
import { type ICampaign, type IDelegate } from '$lib/types';

export interface ICreateCampaignStore {
	campaignDetails: Writable<ICampaign>;
	clearCampaignDetails: () => void;
	createCampaign: () => Promise<void>;
	toggleDelegate: (delegateId: IDelegate['id']) => void;
	getDelegates: () => Promise<string[]>;
}
