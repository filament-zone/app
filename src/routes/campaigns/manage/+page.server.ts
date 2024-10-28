import { generateMockCampaigns } from '$lib/features';
import { HubApiClient } from '$lib/services';

export const load = async () => {
	const campaignToggleOptions = [
		{ value: 'all', label: 'All' },
		{ value: 'active', label: 'Active' },
		{ value: 'finished', label: 'Finished' },
		{ value: 'draft', label: 'Draft' }
	];

	const campaignList = generateMockCampaigns(2);

	const campaignListNew = await HubApiClient.getCampaignsByEthAddr(
		'0x1234567890123456789012345678901234567890'
	);

	console.log('campaignListNew', campaignListNew);

	return {
		campaignToggleOptions,
		campaignList
	};
};
