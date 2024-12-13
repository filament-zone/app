import { hubApiClient, CAMPAIGN_HUB_URLS } from '$lib/api';
import type { IBaseResponse, ICampaign } from '$lib/types';

export class CampaignHubApiClient {
	static async getCampaigns(): Promise<IBaseResponse<ICampaign[]>> {
		return await hubApiClient(CAMPAIGN_HUB_URLS.CAMPAIGNS, { method: 'GET' });
	}

	static async getCampaignById(campaignId: string): Promise<IBaseResponse<ICampaign>> {
		return await hubApiClient(CAMPAIGN_HUB_URLS.CAMPAIGN_BY_ID.replace(':campaignId', campaignId), {
			method: 'GET'
		});
	}

	static async getCampaignsByEthAddr(addr: string): Promise<IBaseResponse<ICampaign[]>> {
		return await hubApiClient(
			CAMPAIGN_HUB_URLS.CAMPAIGNS_BY_ETH_ADDRESS.replace(':eth_addr', addr),
			{
				method: 'GET'
			}
		);
	}
}
