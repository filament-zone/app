import type { Readable, Writable } from 'svelte/store';
import type { ICampaign } from '$lib/types';

export interface ICampaignDetailsStore {
	campaignDetails: Writable<ICampaign | undefined>;
	campaignIdDerived: Readable<bigint | undefined>;
	updateCampaignDetails: () => Promise<void>;
	setCampaignDetails: (campaign: ICampaign) => void;
	initCampaign: (campaignId: ICampaign['id']) => Promise<void>;
	voteCampaignCriteria: (campaignId: ICampaign['id'], voteOption: string) => void;
}
