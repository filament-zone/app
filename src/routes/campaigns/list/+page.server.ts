import { generateMockCampaigns } from '$lib/features';

export const load = async () => {
	const campaignToggleOptions = [
		{ value: 'all', label: 'All' },
		{ value: 'active', label: 'Active' },
		{ value: 'finished', label: 'Finished' },
		{ value: 'draft', label: 'Draft' }
	];

	const campaignList = generateMockCampaigns(2);

	return {
		campaignToggleOptions,
		campaignList
	};
};
