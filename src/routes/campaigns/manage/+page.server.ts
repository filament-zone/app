import { CampaignHubApiClient } from '$lib/api';

export const load = async () => {
	const campaignToggleOptions = [
		{ value: 'all', label: 'All' },
		{ value: 'active', label: 'Active' },
		{ value: 'finished', label: 'Finished' },
		{ value: 'draft', label: 'Draft' }
	];

	const { data } = await CampaignHubApiClient.getCampaigns();

	return {
		campaignToggleOptions,
		campaignList: data
	};
};
