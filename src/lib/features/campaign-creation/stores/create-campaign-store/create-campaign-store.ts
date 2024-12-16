import { get, writable } from 'svelte/store';
import { hubStore, modalStore, toastsStore, transactionStore } from '$lib/features';
import { generateMockEligibilityCriteria } from '$lib/features/campaign-creation/mock/mock';
import { type CallMessage } from '@filament-zone/filament/CallMessage';
import {
	EContract,
	EDelegatesABI,
	EModalVariant,
	type ICampaign,
	type ICampaignStore
} from '$lib/types';
import { ECampaignTimeSettings } from '$lib/api/hub/campaign/campaign.hub.api.types';

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

const { openModal } = modalStore;
const { send } = toastsStore;

const toggleDelegate: ICampaignStore['toggleDelegate'] = (delegateId: string) => {
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

const initiateCampaign: ICampaignStore['initiateCampaign'] = (campaign) => {
	campaignDetails.set({ ...campaign });
	openModal({ variant: EModalVariant.CAMPAIGN_INITIATE });
};

const depositToCampaign: ICampaignStore['depositToCampaign'] = (campaign) => {
	campaignDetails.set({ ...campaign });
	openModal({ variant: EModalVariant.CAMPAIGN_DEPOSIT });
};

const setTokenAllowance: ICampaignStore['setTokenAllowance'] = () => {
	openModal({ variant: EModalVariant.CAMPAIGN_DEPOSIT_TIMELINE });
};

const createHubTx: ICampaignStore['createHubTx'] = (msg) => {
	const { processHubTransaction } = hubStore;

	return processHubTransaction.bind(null, { msg });
};

const createCampaign: ICampaignStore['createCampaign'] = async () => {
	const payload: CallMessage = {
		Draft: {
			title: get(campaignDetails).title as string,
			description: get(campaignDetails).description as string,
			criteria: get(campaignDetails).criteria,
			evictions: get(campaignDetails).evictions
			// delegates: get(campaignDetails).delegates
		}
	};
	const hubTx = createHubTx({
		core: {
			...payload
		}
	});
	await hubTx();
	return true;
};

const getDelegates = async () => {
	const { newTransaction } = transactionStore;

	const getDataDelegatesTx = newTransaction(EContract.FILAMENT_SC, EDelegatesABI.GET_ALL_DELEGATES);

	await getDataDelegatesTx?.run();

	getDataDelegatesTx?.onSuccess((payload) => {
		console.log('delegates', payload.data);
	});
};

export const campaignStore: ICampaignStore = {
	campaignDetails,
	clearCampaignDetails,
	createCampaign,
	toggleDelegate,
	initiateCampaign,
	depositToCampaign,
	setTokenAllowance,
	createHubTx,
	getDelegates
};
