import type { Campaign, Criterion, CriterionCategory } from '@filament-zone/filament';
import { ECampaignTimeSettings, EEligibilityCriteriaType } from '$lib/types';
import type { CriteriaVote } from '@filament-zone/filament/CriteriaVote';

export interface IDelegate {
	id: string;
	name: string;
	value: string;
	votingPower: number;
	evictionCost: number;
}

export interface IContract {
	network: string;
	address: string;
}

export interface ICriteriaInput {
	name: string;
	type: string;
	options?: string[];
}

export interface IEligibilityCriteria extends Criterion {
	id: string | null;
	type: EEligibilityCriteriaType | null;
	tvl: string | null;
	contracts: IContract[] | null;
	inputs?: ICriteriaInput[];
}

export type TCriterionPayload = {
	name: string;
	category: CriterionCategory;
	weight: bigint;
	parameters: {
		tvl: string;
		type: string;
	};

	contracts: IContract[];
	inputs: ICriteriaInput[];
};

export interface ICampaign extends Campaign {
	// OTHER VALUES COMMON
	createdAt?: string | null;
	// OTHER VALUES COMMON

	// STEP 1 VALUES title, description, evictions comes from Campaign type

	// STEP 2 VALUES START
	timeSettings: {
		selectedType: ECampaignTimeSettings | null;
		[ECampaignTimeSettings.ONE_TIME]: {
			date: string | null;
		};
		[ECampaignTimeSettings.RECURRING]: {
			startDate: string | null;
			endDate: string | null;
			interval: string | null;
			total: string | null;
		};
	};
	criteria: Criterion[];
	// STEP 2 VALUES END

	// START STEP-3
	visibility: string | null;
	relativeShare: string | null;
	totalAirDropSupply: string | null;
	tokenContractAddress: string | null;
	budgetFrom: string | null;
	budgetTo: string | null;
	bond: string | null;
	// END STEP-3
}

export interface IGetCampaignCriteriaVotesResponse {
	[key: string]: CriteriaVote;
}

export interface IGetCampaignDistributionVotesResponse {
	[key: string]: CriteriaVote;
}
