import { get, writable } from 'svelte/store';
import { hubStore, modalStore, transactionStore } from '$lib/features';
import {
	EContract,
	EDelegatesABI,
	EModalVariant,
	type ICampaign,
	type ICampaignStore
} from '$lib/types';
import { ECampaignTimeSettings } from '$lib/features/campaign/campaign.types';

const initCampaignDetails: ICampaign = {
	// STEP 1 START
	title: null,
	description: null,
	maxEvictableDelegates: null,
	activeDelegates: [],
	evictedDelegates: [],
	// STEP 1 END
	// STEP 2 START
	timeSettings: ECampaignTimeSettings.RECURRING,
	snapshotDate: null,
	snapshotStartDateRecurring: null,
	snapshotInterval: null,
	snapshotTotal: null,
	snapshotEndDateRecurring: null,
	criteria: [],
	// STEP 2 END
	// STEP 3 START
	visibility: null,
	relativeShare: null,
	totalAirDropSupply: null,
	tokenContractAddress: null,
	indexer: null,
	budgetFrom: null,
	budgetTo: null,
	bond: null
	// STEP 3 END
	// STEP 4 START
	// STEP 4 END
};

const campaignDetails = writable({ ...initCampaignDetails });

const { openModal } = modalStore;

const toggleDelegate: ICampaignStore['toggleDelegate'] = (delegateId: string) => {
	campaignDetails.update((details) => {
		const activeIndex = details.activeDelegates.indexOf(delegateId);
		const evictedIndex = details.evictedDelegates.indexOf(delegateId);

		if (activeIndex !== -1) {
			details.activeDelegates.splice(activeIndex, 1);
			details.evictedDelegates.push(delegateId);
		} else if (evictedIndex !== -1) {
			details.evictedDelegates.splice(evictedIndex, 1);
			details.activeDelegates.push(delegateId);
		} else {
			details.activeDelegates.push(delegateId);
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
	const hubTx = createHubTx({
		Init: {
			title: get(campaignDetails).title,
			description: get(campaignDetails).description,
			criteria: get(campaignDetails).criteria,
			evictions: get(campaignDetails).evictedDelegates
		}
	});
	await hubTx();
	return true;
};

const sendTestHubTx: ICampaignStore['sendTestHubTx'] = async () => {
	const hubTx = createHubTx({
		bank: {
			freeze: {
				token_id: 'token_1rwrh8gn2py0dl4vv65twgctmlwck6esm2as9dftumcw89kqqn3nqrduss6'
			}
		}
	});

	await hubTx();
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
	sendTestHubTx,
	getDelegates
};
