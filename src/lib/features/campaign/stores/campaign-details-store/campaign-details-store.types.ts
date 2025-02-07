import type { Readable, Writable } from 'svelte/store';
import type { ICampaign } from '$lib/types';

export interface ICampaignDetailsStore {
	campaignDetails: Writable<ICampaign | undefined>;
	campaignIdDerived: Readable<bigint | undefined>;
	updateCampaignDetails: () => Promise<void>;
	setCampaignDetails: (campaign: ICampaign) => void;
	initCampaign: (campaignId: ICampaign['id']) => Promise<void>;
	voteCampaignCriteria: (campaignId: ICampaign['id'], voteOption: string) => void;
	voteCampaignDistribution: (campaignId: ICampaign['id'], voteOption: string) => void;
	isCriteriaVoteAccessibleFn: (
		campaignPhase: ICampaign['phase'],
		isDelegate: boolean,
		walletAddress: string
	) => boolean;
	isDistributionVoteAccessibleFn: (
		campaignPhase: ICampaign['phase'],
		isDelegate: boolean,
		walletAddress: string
	) => boolean;
	campaignNumericPhase: Readable<number>;
	isCampaignOwner: (campaignOwner: string, walletAddress: string) => boolean;
	isCampaignDelegate: (delegatesList: string[], walletAddress: string) => boolean;
}
