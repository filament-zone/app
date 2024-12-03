import { hubApiClient } from '$lib/services';
import { uint8ArrayToBase64 } from '$lib/helpers';
import { HUB_URLS } from '$lib/types';

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
}
