import { CampaignApi } from '$lib/api';
import { generateMockCampaign } from '$lib/features';
import type { ICampaign } from '$lib/types';

export const load = async () => {
	const campaignToggleOptions = [
		{ value: 'all', label: 'Public Campaigns' },
		{ value: 'myCampaigns', label: 'My Campaigns' }
	];

	const res = await CampaignApi.getCampaigns();

	const mockedCampaigns: ICampaign[] = [];

	if (!res.data?.length) {
		for (let i = 0; i < 15; i++) {
			mockedCampaigns.push(generateMockCampaign());
		}
	}

	return {
		campaignToggleOptions,
		campaignList: res?.data ? res.data : mockedCampaigns
	};
};
