import type { IHubRpcClient } from '$lib/types';

export class HubRpcClient implements IHubRpcClient {
	private readonly rpcUrl: string;

	constructor() {
		this.rpcUrl = '';
	}

	public async send<T>(method: string, params: unknown[] = []): Promise<T> {
		const body = {
			jsonrpc: '2.0',
			id: new Date().getTime(),
			method,
			params
		};

		try {
			const response = await fetch(this.rpcUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});

			const json = await response.json();
			if (json.error) {
				throw new Error(`JSON-RPC Error: ${json.error.message}`);
			}

			return json.result;
		} catch (error) {
			console.error('Error sending JSON-RPC request:', error);
			throw error;
		}
	}
}
