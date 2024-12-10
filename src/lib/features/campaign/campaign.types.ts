import type { CriterionCategory } from '@filament-zone/filament/CriterionCategory';
import { EEligibilityCriteriaType } from '$lib/types';
import type { Criterion } from '@filament-zone/filament/Criterion';

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

export enum ECampaignTimeSettings {
	ONE_TIME = 'ONE_TIME',
	RECURRING = 'RECURRING'
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

export interface ICampaign {
	id?: string;
	createdAt?: string | null;
	collateralStatus?: {
		date?: string | null;
		status?: string | null;
	};
	// STEP 1 VALUES START
	title: string | null;
	description: string | null;
	maxEvictableDelegates: string | null;
	activeDelegates: string[];
	evictedDelegates: string[];
	// STEP 1 VALUES END
	// STEP 2 VALUES START
	timeSettings: ECampaignTimeSettings | null;
	snapshotDate: string | null;
	snapshotStartDateRecurring: string | null;
	snapshotInterval: string | null;
	snapshotTotal: string | null;
	snapshotEndDateRecurring: string | null;
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
	// START STEP-4
	// END STEP-4
}
