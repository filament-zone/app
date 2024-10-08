import { EEligibilityCriteriaCategory, EEligibilityCriteriaType } from '$lib/types';

export interface IDelegate {
	id: string;
	name: string;
	value: string;
	votingPower: string;
	evictionCost: string;
	selected: boolean;
}

export interface IContract {
	network: string;
	address: string;
}

export interface IEligibilityCriteria {
	id: string | null;
	name: string | null;
	category: EEligibilityCriteriaCategory | null;
	type: EEligibilityCriteriaType | null;
	tvl: string | null;
	weight: string | null;
	contracts: IContract[] | null;
	completed?: boolean;
}

export interface ICampaign {
	createdAt?: string | null;
	collateralStatus?: {
		date?: string | null;
		status?: string | null;
	};
	// STEP 1 VALUES START
	title: string | null;
	description: string | null;
	maxEvictableDelegates: string | null;
	selectedActiveDelegates: string[];
	selectedEvictedDelegates: string[];
	// STEP 1 VALUES END
	// STEP 2 VALUES START
	snapshotDate: string | null;
	snapshotInterval: string | null;
	snapshotTotal: string | null;
	criteria: IEligibilityCriteria[];
	// STEP 2 VALUES END
	// START STEP-3
	visibility: string | null;
	relativeShare: string | null;
	totalAirDropSupply: string | null;
	tokenContractAddress: string | null;
	indexer: string | null;
	budgetFrom: string | null;
	budgetTo: string | null;
	bond: string | null;
	// END STEP-3
	// START STEP-4
	// END STEP-4
}
