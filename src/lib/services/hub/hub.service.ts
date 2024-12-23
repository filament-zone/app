import { ethers } from 'ethers';
import JSONBig from 'json-bigint';
import { PUBLIC_THE_HUB_CHAIN_ID } from '$env/static/public';
import { EventEmitter, EWalletProvider, WalletClientConnector } from '$lib/services';
import { TransactionHubApiClient } from '$lib/api';

export class HubService {
	private WalletClientConnector: WalletClientConnector;

	constructor() {
		this.WalletClientConnector = new WalletClientConnector({
			walletProvider: EWalletProvider.METAMASK
		});
	}

	public async processHubTransaction({
		id,
		msg,
		nonce,
		eventEmitter
	}: {
		id: string;
		msg: object;
		nonce: number;
		eventEmitter: EventEmitter;
	}): Promise<null | void> {
		eventEmitter.emit('transaction:start', { id, msg });
		const { serialize_call, new_serialized_tx, new_unsigned_tx } = await import(
			'@filament-zone/filament/filament_hub_wasm'
		);
		try {
			await this.WalletClientConnector.connect();
			const chainId = BigInt(PUBLIC_THE_HUB_CHAIN_ID);

			const payload = JSONBig.stringify(msg);
			const serializedCall = serialize_call(payload);

			const newUnsignedTx = new_unsigned_tx(serializedCall, chainId, BigInt(nonce));

			const signature = await this.WalletClientConnector.Client.Signer?.signMessage(newUnsignedTx);

			if (!signature) {
				return null;
			}

			const serializedSignedTx = new_serialized_tx(
				ethers.getBytes(signature),
				serializedCall,
				chainId,
				BigInt(nonce)
			);

			eventEmitter.emit('transaction:send:start', { id });
			await TransactionHubApiClient.sendTx(serializedSignedTx);
			eventEmitter.emit('transaction:send:success', { id });

			eventEmitter.emit('transaction:success', { id });
		} catch (error) {
			eventEmitter.emit('transaction:error', { id, error });
			throw error;
		}
	}
}
