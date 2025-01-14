import { hubApiClient, TRANSACTION_HUB_URLS, TRANSACTION_HUB_WS_URLS } from '$lib/api';
import { replaceUrlParams, uint8ArrayToBase64 } from '$lib/helpers';
import { WebSocketClient } from '$lib/api/hub.api.ws-client';
import type { IGetTxStatusLedgerResponse } from '$lib/types';

export class TransactionHubApiClient {
	static async sendTx(serializedTx: Uint8Array) {
		const base64Tx = uint8ArrayToBase64(serializedTx);
		return await hubApiClient(TRANSACTION_HUB_URLS.SEND_TX, {
			body: { transactions: [base64Tx] },
			method: 'POST'
		});
	}

	static async getTxStatusSequencer(txHash: string) {
		return await hubApiClient(
			replaceUrlParams(TRANSACTION_HUB_URLS.GET_TX_STATUS_SEQUENCER, { txHash }),
			{
				method: 'GET'
			}
		);
	}

	static async getTxStatusLedger(txHash: string) {
		return await hubApiClient<IGetTxStatusLedgerResponse>(
			replaceUrlParams(TRANSACTION_HUB_URLS.GET_TX_STATUS_LEDGER, { txHash }),
			{
				method: 'GET'
			}
		);
	}

	static wsTxStatusSequencer(txHash: string) {
		return new WebSocketClient(
			replaceUrlParams(TRANSACTION_HUB_WS_URLS.WS_TX_STATUS_SEQUENCER, { txHash })
		);
	}
}
