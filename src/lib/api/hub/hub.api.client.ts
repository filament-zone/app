import { PUBLIC_HUB_API } from '$env/static/public';
import { ofetch, type FetchOptions, FetchError } from 'ofetch';
import type { TErrorHandler } from '$lib/types';

const defaultErrorHandler = (statusCode: number) => {
	switch (statusCode) {
		case 400:
			throw new Error('Bad Request: Check your input parameters.');
		case 401:
			throw new Error('Unauthorized: Please login again.');
		case 403:
			throw new Error('Forbidden: You do not have access to this resource.');
		case 404:
			throw new Error('Not Found: The requested resource does not exist.');
		case 500:
			throw new Error('Internal Server Error: Please try again later.');
		default:
			throw new Error(`Unexpected Error: ${statusCode}`);
	}
};

const hubApiClient = ofetch.create({
	headers: {
		'Content-Type': 'application/json'
	},
	baseURL: PUBLIC_HUB_API,
	retry: 0
});

const request = async <T>(
	url: string,
	options?: FetchOptions<'json'>,
	errorHandler?: TErrorHandler<T>
): Promise<T> => {
	try {
		return await hubApiClient(url, options);
	} catch (error) {
		if (error instanceof FetchError) {
			const statusCode = error.response?.status;

			if (statusCode) {
				if (errorHandler) {
					const result = errorHandler(statusCode);
					if (result !== undefined) {
						return result as T;
					}
				} else {
					defaultErrorHandler(statusCode);
				}
			}
		}

		throw new Error('Network Error: Unable to reach the server.');
	}
};

export { request as hubApiClient };
