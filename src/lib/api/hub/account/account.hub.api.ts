import { ACCOUNT_HUB_URLS, hubApiClient } from '$lib/api';
import type { IBaseResponse, IHubAccountInfo, TErrorHandler } from '$lib/types';

export class AccountHubApiClient {
	static async getAccountInfoByEthAddr(addr: string): Promise<IBaseResponse<IHubAccountInfo>> {
		const errorHandler: TErrorHandler<IBaseResponse<IHubAccountInfo>> = (statusCode) => {
			if (statusCode === 404) {
				return { data: { nonce: 0 }, meta: {} };
			}
			return;
		};

		return await hubApiClient(
			ACCOUNT_HUB_URLS.GET_ACCOUNT_INFO.replace(':eth_addr', addr),
			{
				method: 'GET'
			},
			errorHandler
		);
	}
}
