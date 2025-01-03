import { CAMPAIGN_HUB_URLS, hubApiClient, ethereumApiClient } from '$lib/api';
import { EClient, EContract, EDelegatesABI, EWalletProvider, type ICampaign } from '$lib/types';
import {
	SC_ABI_CONFIG,
	SC_ADDRESS_CONFIG
} from '$lib/services/transaction/ethereum.transaction/ethereum.config';
import { TransactionClientAdapter } from '$lib/services';
import type { CallMessage } from '@filament-zone/filament/CallMessage';

export class CampaignApi {
	static async getCampaigns() {
		return await hubApiClient<ICampaign[]>(CAMPAIGN_HUB_URLS.CAMPAIGNS, { method: 'GET' });
	}

	static async getCampaignById(campaignId: string) {
		return await hubApiClient<ICampaign>(
			CAMPAIGN_HUB_URLS.CAMPAIGN_BY_ID.replace(':campaignId', campaignId),
			{
				method: 'GET'
			}
		);
	}

	static async getCampaignsByEthAddr(addr: string) {
		return await hubApiClient<ICampaign[]>(
			CAMPAIGN_HUB_URLS.CAMPAIGNS_BY_ETH_ADDRESS.replace(':eth_addr', addr),
			{
				method: 'GET'
			}
		);
	}

	static async createCampaign(payload: Extract<CallMessage, { Draft: unknown }>['Draft']) {
		return new TransactionClientAdapter({
			payload: {
				core: {
					draft: {
						...payload
					}
				}
			},
			walletProvider: EWalletProvider.METAMASK,
			client: EClient.THE_HUB
		});
	}

	static async voteCampaign(
		payload: Extract<CallMessage, { VoteCriteria: unknown }>['VoteCriteria']
	) {
		return new TransactionClientAdapter({
			payload: {
				core: {
					vote_criteria: {
						...payload
					}
				}
			},
			walletProvider: EWalletProvider.METAMASK,
			client: EClient.THE_HUB
		});
	}

	static async getDelegates() {
		return await ethereumApiClient.callContractMethod(
			SC_ADDRESS_CONFIG[EContract.FILAMENT_SC],
			SC_ABI_CONFIG[EContract.FILAMENT_SC],
			EDelegatesABI.GET_ALL_DELEGATES as string
		);
	}
}
