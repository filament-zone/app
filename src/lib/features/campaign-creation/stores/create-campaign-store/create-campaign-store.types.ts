import type { Writable } from 'svelte/store';
import { type ICampaign, type IDelegate } from '$lib/types';

export interface ICreateCampaignStore {
	campaignDetails: Writable<ICampaign>;
	clearCampaignDetails: () => void;
	createCampaign: () => Promise<boolean>;
	toggleDelegate: (delegateId: IDelegate['id']) => void;
	getDelegates: () => void;
	voteCampaignCriteria: (voteOption: string, campaignId: number) => void;
}
