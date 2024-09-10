import { writable } from 'svelte/store';
import { type ICampaign, type ICampaignStore } from '$lib/types';

const initCampaignDetails: ICampaign = {
	// STEP 1 START
	title: null,
	description: null,
	maxEvictableDelegates: null,
	selectedActiveDelegates: []
	// STEP 1 END
	// STEP 2 START
	// STEP 2 END
	// STEP 3 START
	// STEP 3 END
	// STEP 4 START
	// STEP 4 END
};

const campaignDetails = writable({ ...initCampaignDetails });

const toggleActiveDelegate = (delegate: string) => {
	campaignDetails.update((details) => {
		const index = details.selectedActiveDelegates.indexOf(delegate);
		if (index === -1) {
			details.selectedActiveDelegates.push(delegate);
		} else {
			details.selectedActiveDelegates.splice(index, 1);
		}
		return details;
	});
};

const clearCampaignDetails = () => {
	campaignDetails.set({ ...initCampaignDetails });
};

const createCampaign: ICampaignStore['createCampaign'] = () => {
	return true;
};

export const campaignStore: ICampaignStore = {
	campaignDetails,
	clearCampaignDetails,
	createCampaign,
	toggleActiveDelegate
};
