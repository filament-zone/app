import { get, writable } from 'svelte/store';
import { toastsStore } from '$lib/features';
import { generateMockEligibilityCriteria } from '$lib/features/campaign-creation/mock/mock';
import { type ICampaign, type ICreateCampaignStore } from '$lib/types';
import { ECampaignTimeSettings } from '$lib/api/campaign/campaign.hub.api.enums';
import { CampaignApi } from '$lib/api';
import type { VoteOption } from '@filament-zone/filament/VoteOption';

const initCampaignDetails: ICampaign = {
	id: 0n,
	campaigner: '',
	phase: 'Draft',
	delegates: [],
	indexer: '',
	// // STEP 1 START
	title: '',
	description: '',
	evictions: [],
	// // STEP 1 END

	// // STEP 2 START

	// TODO: need to be added to the hub api - timeSettings
	timeSettings: {
		selectedType: ECampaignTimeSettings.RECURRING,
		[ECampaignTimeSettings.ONE_TIME]: {
			date: ''
		},
		[ECampaignTimeSettings.RECURRING]: {
			startDate: '',
			endDate: '',
			interval: '',
			total: ''
		}
	},
	criteria: generateMockEligibilityCriteria(3),
	// // STEP 2 END

	// // STEP 3 START
	// TODO: need to be added to the hub api - visibility, relativeShare, totalAirDropSupply, tokenContractAddress, budgetFrom, budgetTo, bond
	visibility: 'public',
	relativeShare: '5',
	totalAirDropSupply: '5',
	tokenContractAddress: '5',
	budgetFrom: '5',
	budgetTo: '10',
	bond: '5'
	// // STEP 3 END
};

const campaignDetails = writable({ ...initCampaignDetails });

const { send } = toastsStore;

const toggleDelegate: ICreateCampaignStore['toggleDelegate'] = (delegateId: string) => {
	campaignDetails.update((details) => {
		const evictedIndex = details.evictions.indexOf(delegateId);

		if (evictedIndex === -1) {
			if (details.evictions.length === 3) {
				send({ message: 'You can only evict 3 delegates at a time' });
			} else {
				details.evictions.push(delegateId);
			}
		} else {
			details.evictions.splice(evictedIndex, 1);
		}
		return details;
	});
};

const clearCampaignDetails = () => {
	campaignDetails.set({ ...initCampaignDetails });
};

const createCampaign: ICreateCampaignStore['createCampaign'] = async () => {
	const tx = await CampaignApi.createCampaign({
		title: get(campaignDetails).title as string,
		description: get(campaignDetails).description as string,
		criteria: get(campaignDetails).criteria,
		evictions: []
	});

	tx.onSuccess((res) => {
		console.log('createCampaign API onSuccess res', res);
	});

	await tx.run();

	return true;
};

const voteCampaign: ICreateCampaignStore['voteCampaign'] = async (voteOption, campaignId) => {
	let payload: VoteOption;
	if (voteOption === 'Yes') {
		payload = { Yes: { weights: [1n] } };
	} else {
		payload = 'No';
	}

	const tx = await CampaignApi.voteCampaign({
		campaign_id: BigInt(campaignId),
		option: payload
	});

	tx.onSuccess((res) => {
		console.log('voteCampaign API res', res);
	});

	await tx.run();
};

const getDelegates = async () => {
	await CampaignApi.getDelegates();
};

export const campaignStore: ICreateCampaignStore = {
	campaignDetails,
	clearCampaignDetails,
	createCampaign,
	toggleDelegate,
	getDelegates,
	voteCampaign
};
