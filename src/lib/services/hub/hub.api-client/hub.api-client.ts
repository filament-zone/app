import { env } from '$env/dynamic/public';
import { ofetch, type FetchOptions } from 'ofetch';

const hubApiClient = ofetch.create({
	headers: {
		'Content-Type': 'application/json'
	},
	baseURL: env.PUBLIC_HUB_API
});

const request = async (url: string, options?: FetchOptions<'json'> | undefined) => {
	return await hubApiClient(url, options);
};

export { request as hubApiClient };
