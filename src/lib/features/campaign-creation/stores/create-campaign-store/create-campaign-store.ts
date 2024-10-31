import { get, writable } from 'svelte/store';
import { modalStore, hubStore } from '$lib/features';
import { EModalVariant, type ICampaign, type ICampaignStore } from '$lib/types';

const initCampaignDetails: ICampaign = {
	// STEP 1 START
	title: null,
	description: null,
	maxEvictableDelegates: null,
	activeDelegates: [],
	evictedDelegates: [],
	// STEP 1 END
	// STEP 2 START
	snapshotDate: null,
	snapshotInterval: null,
	snapshotTotal: null,
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

const createCampaign: ICampaignStore['createCampaign'] = () => {
	alert('Campaign was created, see data structure in dev tools');
	console.log('Campaign was created: ', get(campaignDetails));
	return true;
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

const createHubTx = async () => {
	const { processHubTransaction } = hubStore;
	const msg = {
		bank: {
			freeze: {
				token_id: 'token_1rwrh8gn2py0dl4vv65twgctmlwck6esm2as9dftumcw89kqqn3nqrduss6'
			}
		}
	};
	await processHubTransaction({ msg });
};

export const campaignStore: ICampaignStore = {
	campaignDetails,
	clearCampaignDetails,
	createCampaign,
	toggleDelegate,
	initiateCampaign,
	depositToCampaign,
	setTokenAllowance,
	createHubTx
};
