import type { IHubApiClient } from '$lib/types';

export class HubApiClient implements IHubApiClient {
	private readonly host: string;

	constructor({ host }: { host: string }) {
		this.host = host;
	}

	public async post<T>(endpoint: string, payload: unknown): Promise<T> {
		try {
			const response = await fetch(`${this.host}${endpoint}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status} ${response.statusText}`);
			}

			const json = await response.json();
			return json;
		} catch (error) {
			console.error('Error sending POST request:', error);
			throw error;
		}
	}

	public async get<T>(endpoint: string): Promise<T> {
		try {
			const response = await fetch(`${this.host}${endpoint}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status} ${response.statusText}`);
			}

			const json = await response.json();
			return json;
		} catch (error) {
			console.error('Error sending GET request:', error);
			throw error;
		}
	}
}
