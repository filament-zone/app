import { CampaignApi } from '$lib/api';
import { generateMockCampaign } from '$lib/features';
import type { ICampaign } from '$lib/api/campaign/campaign.hub.api.types';

export const load = async () => {
	const campaignToggleOptions = [
		{ value: 'all', label: 'All' },
		{ value: 'proposals', label: 'Proposals' },
		{ value: 'votings', label: 'Votings' },
		{ value: 'distributions', label: 'Distributions' },
		{ value: 'finished', label: 'Finished' },
		{ value: 'yourCampaigns', label: 'Your Campaigns' }
	];

	const res = await CampaignApi.getCampaigns();

	const mockedCampaigns: ICampaign[] = [];

	if (!res.data?.length) {
		for (let i = 0; i < 100; i++) {
			mockedCampaigns.push(generateMockCampaign());
		}
	}

	return {
		campaignToggleOptions,
		campaignList: res?.data ? res.data : mockedCampaigns
	};
};
