import { ethers } from 'ethers';
import { WalletClientConnector, EventEmitter } from '$lib/services';

import { PUBLIC_THE_HUB_CHAIN_ID } from '$env/static/public';
import JSONBig from 'json-bigint';

import type { IEventEmitter } from '$lib/services/event-emitter/event-emitter.types';

export class HubTransactionPrepare {
	private readonly WalletClientConnector: WalletClientConnector;
	private readonly eventEmitter: IEventEmitter;
	private readonly msg: object;
	private readonly nonce: number;

	constructor({
		payload,
		eventEmitter,
		walletClientConnector
	}: {
		payload: object;
		eventEmitter: IEventEmitter;
		walletClientConnector: WalletClientConnector;
	}) {
		this.WalletClientConnector = walletClientConnector;

		this.msg = payload;
		this.nonce = 0;
		this.eventEmitter = eventEmitter ?? new EventEmitter();
	}

	public prepareTransaction = async (): Promise<Uint8Array | null> => {
		const { serialize_call, new_serialized_tx, new_unsigned_tx } = await import(
			'@filament-zone/filament/filament_hub_wasm'
		);

		try {
			await this.WalletClientConnector.connect();
			const chainId = BigInt(PUBLIC_THE_HUB_CHAIN_ID);

			const payload = JSONBig.stringify(this.msg);
			const serializedCall = serialize_call(payload);

			const newUnsignedTx = new_unsigned_tx(serializedCall, chainId, BigInt(this.nonce));

			const signature = await this.WalletClientConnector.Client.Signer?.signMessage(newUnsignedTx);

			if (!signature) {
				return null;
			}

			return new_serialized_tx(
				ethers.getBytes(signature),
				serializedCall,
				chainId,
				BigInt(this.nonce)
			);
		} catch (error) {
			console.log(error);
			return null;
		}
	};
}
