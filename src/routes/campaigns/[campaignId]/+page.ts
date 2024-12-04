import { HubApiClient } from '$lib/services';

export async function load({ params }) {
	const campaignId = params.campaignId;
	const campaign = await HubApiClient.getCampaignById(campaignId);

	return {
		campaign
	};
}
