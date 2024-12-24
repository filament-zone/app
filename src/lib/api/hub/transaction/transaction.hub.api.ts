import { hubApiClient, TRANSACTION_HUB_URLS } from '$lib/api';
import { uint8ArrayToBase64 } from '$lib/helpers';

export class TransactionHubApiClient {
	static async sendTx(serializedTx: Uint8Array) {
		const base64Tx = uint8ArrayToBase64(serializedTx);
		return await hubApiClient(TRANSACTION_HUB_URLS.SEND_TX, {
			body: { transactions: [base64Tx] },
			method: 'POST'
		});
	}
}
