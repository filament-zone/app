import { CAMPAIGN_HUB_URLS } from '$lib/api';

export const replaceUrlParams = (url: string, params: Record<string, string>): string =>
	Object.keys(params).reduce((acum, param) => acum.replace(`:${param}`, params[param]), url);

export const getCampaignEthAddressIdUrl = (eth_addr: string) =>
	CAMPAIGN_HUB_URLS.CAMPAIGNS_BY_ETH_ADDRESS.replace(':eth_addr', eth_addr);
