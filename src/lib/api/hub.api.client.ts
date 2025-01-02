import { PUBLIC_HUB_API } from '$env/static/public';
import { ofetch, type FetchOptions, FetchError } from 'ofetch';
import type { IBaseResponse, TErrorHandler } from '$lib/types';

const defaultErrorHandler = (statusCode: number) => {
	switch (statusCode) {
		case 400:
			console.error('Bad Request: Check your input parameters.');
			break;
		case 401:
			console.error('Unauthorized: Please login again.');
			break;
		case 403:
			console.error('Forbidden: You do not have access to this resource.');
			break;
		case 404:
			console.error('Not Found: The requested resource does not exist.');
			break;
		case 500:
			console.error('Internal Server Error: Please try again later.');
			break;
		default:
			console.error(`Unexpected Error: ${statusCode}`);
			break;
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
	errorHandler?: TErrorHandler<IBaseResponse<T>>
): Promise<IBaseResponse<T>> => {
	try {
		return await hubApiClient(url, options);
	} catch (error) {
		if (error instanceof FetchError) {
			const statusCode = error.response?.status;

			if (statusCode) {
				if (errorHandler) {
					const result = errorHandler(statusCode);
					if (result !== undefined) {
						return result as IBaseResponse<T>;
					} else {
						defaultErrorHandler(statusCode);
					}
				} else {
					defaultErrorHandler(statusCode);
				}
			}

			return {
				data: undefined,
				error: {
					status: statusCode || 500,
					message: error.message || 'An unexpected error occurred'
				}
			} as IBaseResponse<T>;
		}

		console.error('Unknown error occurred:', error);

		return {
			data: undefined,
			error: {
				status: 500,
				message: 'A network error occurred. Please try again later.'
			}
		} as IBaseResponse<T>;
	}
};

export { request as hubApiClient };
