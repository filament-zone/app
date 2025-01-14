import { CAMPAIGN_HUB_URLS, hubApiClient, ethereumApiClient } from '$lib/api';
import { TransactionClientAdapter } from '$lib/services';
import { getCampaignEthAddressIdUrl } from '$lib/helpers';

import {
	SC_ABI_CONFIG,
	SC_ADDRESS_CONFIG
} from '$lib/services/transaction/ethereum.transaction/ethereum.config';
import type { CallMessage } from '@filament-zone/filament/CallMessage';
import {
	EClient,
	EContract,
	EDelegatesABI,
	EWalletProvider,
	type ICampaign,
	type IGetCampaignCriteriaVotesResponse,
	type IGetCampaignDistributionVotesResponse
} from '$lib/types';

export class CampaignApi {
	static async getCampaigns() {
		return await hubApiClient<ICampaign[]>(CAMPAIGN_HUB_URLS.CAMPAIGNS, { method: 'GET' });
	}

	static async getCampaignById(campaignId: ICampaign['id']) {
		return await hubApiClient<ICampaign>(
			CAMPAIGN_HUB_URLS.CAMPAIGN_BY_ID.replace(':campaignId', campaignId.toString()),
			{
				method: 'GET'
			}
		);
	}

	static async getCampaignsByEthAddr(addr: ICampaign['campaigner']) {
		return await hubApiClient<ICampaign[]>(getCampaignEthAddressIdUrl(addr), {
			method: 'GET'
		});
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
		}).create();
	}

	static async initCampaign(payload: Extract<CallMessage, { Init: unknown }>['Init']) {
		return new TransactionClientAdapter({
			payload: {
				core: {
					init: {
						...payload
					}
				}
			},
			walletProvider: EWalletProvider.METAMASK,
			client: EClient.THE_HUB
		}).create();
	}

	static async voteCampaignCriteria(
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
		}).create();
	}

	static async getCampaignCriteriaVotes(campaignId: ICampaign['id']) {
		return await hubApiClient<IGetCampaignCriteriaVotesResponse>(
			CAMPAIGN_HUB_URLS.CAMPAIGN_CRITERIA_VOTES.replace(':campaignId', campaignId.toString()),
			{
				method: 'GET'
			}
		);
	}

	static async getCampaignDistributionVotes(campaignId: ICampaign['id']) {
		return await hubApiClient<IGetCampaignDistributionVotesResponse>(
			CAMPAIGN_HUB_URLS.CAMPAIGN_DISTRIBUTION_VOTES.replace(':campaignId', campaignId.toString()),
			{
				method: 'GET'
			}
		);
	}

	static async getDelegates() {
		return await ethereumApiClient.callContractMethod(
			SC_ADDRESS_CONFIG[EContract.FILAMENT_SC],
			SC_ABI_CONFIG[EContract.FILAMENT_SC],
			EDelegatesABI.GET_ALL_DELEGATES as string
		);
	}
}
