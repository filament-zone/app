import { get, writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { CampaignApi, TransactionHubApiClient } from '$lib/api';
import { toastsStore } from '$lib/features';
import { routes } from '$lib/constants';
import { generateMockEligibilityCriteria } from '$lib/features/campaign/mock/mock';
import { type ICampaign, type ICreateCampaignStore } from '$lib/types';
import { ECampaignTimeSettings } from '$lib/api/campaign/campaign.hub.api.enums';

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

	if (!tx?.txHash) {
		return;
	}

	tx?.onSuccess(() => {
		let completed = false;
		const interval = setInterval(async () => {
			if (!tx.txHash) {
				return;
			}

			const res = await TransactionHubApiClient.getTxStatusLedger(tx.txHash);

			if (res.data?.receipt.result === 'successful') {
				send({ message: 'Campaign successfully created' });
				completed = true;
			}

			if (completed) {
				clearInterval(interval);
				await goto(routes.CAMPAIGNS.MANAGE.ROOT);
			}
		}, 1000);
	});
	send({ message: 'Creating campaign... ' });
	tx?.run();
};

const getDelegates = async () => {
	return await CampaignApi.getDelegates();
};

export const campaignStore: ICreateCampaignStore = {
	campaignDetails,
	clearCampaignDetails,
	createCampaign,
	toggleDelegate,
	getDelegates
};
