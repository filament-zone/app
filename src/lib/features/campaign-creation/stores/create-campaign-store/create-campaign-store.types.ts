import type { Writable } from 'svelte/store';
import type { ICampaign, IDelegate } from '$lib/types';

export interface ICampaignStore {
	campaignDetails: Writable<ICampaign>;
	clearCampaignDetails: () => void;
	createCampaign: () => boolean;
	toggleActiveDelegate: (delegateId: IDelegate['id']) => void;
}
