import { ethers, SigningKey } from 'ethers';
import { hexToBytes } from 'ethereum-cryptography/utils';
import { EventEmitter, EWalletProvider, HubApiClient, WalletClientConnector } from '$lib/services';

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
		eventEmitter
	}: {
		id: string;
		msg: object;
		eventEmitter: EventEmitter;
	}): Promise<null | void> {
		eventEmitter.emit('transaction:start', { id, msg });
		const { serialize_call, new_serialized_tx, new_unsigned_tx } = await import(
			'@filament-zone/filament/filament_hub_wasm'
		);
		try {
			await this.WalletClientConnector.connect();

			const chainId = BigInt(4321);

			const serializedCall = serialize_call(JSON.stringify(msg));

			const newUnsignedTx = new_unsigned_tx(serializedCall, chainId);

			const signature = await this.WalletClientConnector.Client.Signer?.signMessage(newUnsignedTx);

			if (!signature) {
				return null;
			}

			const messageHashHex = ethers.hashMessage(serializedCall);
			const messageHash = hexToBytes(messageHashHex);

			const recoveredPublicKey = SigningKey.recoverPublicKey(messageHash, signature);

			const serializedSignedTx = new_serialized_tx(
				ethers.getBytes(signature),
				ethers.getBytes(recoveredPublicKey),
				serializedCall,
				chainId
			);

			eventEmitter.emit('transaction:send:start', { id });
			await HubApiClient.sendTx(serializedSignedTx);
			eventEmitter.emit('transaction:send:success', { id });

			eventEmitter.emit('transaction:success', { id });
		} catch (error) {
			eventEmitter.emit('transaction:error', { id, error });
			throw error;
		}
	}
}
