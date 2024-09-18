import { get, writable } from 'svelte/store';
import { hubStore } from '$lib/features';
import { EDelegateType, type ICampaign, type ICampaignStore } from '$lib/types';

const initCampaignDetails: ICampaign = {
	// STEP 1 START
	title: null,
	description: null,
	maxEvictableDelegates: null,
	selectedActiveDelegates: [],
	selectedEvictedDelegates: [],
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

const toggleDelegate: ICampaignStore['toggleDelegate'] = (
	delegateId: string,
	delegateType: EDelegateType
) => {
	campaignDetails.update((details) => {
		if (delegateType === EDelegateType.ACTIVE) {
			const index = details.selectedActiveDelegates.indexOf(delegateId);
			if (index === -1) {
				details.selectedActiveDelegates.push(delegateId);
			} else {
				details.selectedActiveDelegates.splice(index, 1);
			}
		} else if (delegateType === EDelegateType.EVICTED) {
			const index = details.selectedEvictedDelegates.indexOf(delegateId);
			if (index === -1) {
				details.selectedEvictedDelegates.push(delegateId);
			} else {
				details.selectedEvictedDelegates.splice(index, 1);
			}
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

const createHubTx = async () => {
	const { processHubTransaction } = hubStore;
	const msg = new Uint8Array(8);
	await processHubTransaction({ msg });
};

export const campaignStore: ICampaignStore = {
	campaignDetails,
	clearCampaignDetails,
	createCampaign,
	toggleDelegate,
	createHubTx
};
