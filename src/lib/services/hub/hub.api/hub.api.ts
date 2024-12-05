import { hubApiClient } from '$lib/services';
import { uint8ArrayToBase64 } from '$lib/helpers';
import { HUB_URLS, type ICampaign } from '$lib/types';
import { generateMockCampaigns } from '$lib/features';

export class HubApiClient {
	static async sendTx(serializedTx: Uint8Array): Promise<void> {
		const base64Tx = uint8ArrayToBase64(serializedTx);
		await hubApiClient(HUB_URLS.SEND_TX, { body: { body: base64Tx }, method: 'POST' });
	}

	static async getCampaignsByEthAddr(addr: string): Promise<void> {
		return await hubApiClient(HUB_URLS.CAMPAIGNS_BY_ETH_ADDRESS.replace(':address', addr), {
			method: 'GET'
		});
	}

	static async getAllCampaigns(): Promise<void> {
		return await hubApiClient(HUB_URLS.CAMPAIGNS, { method: 'GET' });
	}

	static async getCampaignById(campaignId: string): Promise<ICampaign> {
		// return await hubApiClient(HUB_URLS.CAMPAIGN_BY_ID.replace(':campaignId', campaignId), {
		// 	method: 'GET'
		// });
		console.log('GET  getCampaignById', campaignId);
		return await new Promise((resolve) => {
			setTimeout(() => {
				resolve(generateMockCampaigns(1)[0]);
			}, 2000);
		});
	}
}
