import { ethers, SigningKey } from 'ethers';
import { hexToBytes } from 'ethereum-cryptography/utils';
import { serialize_call, new_serialized_tx, new_unsigned_tx } from 'filament-hub-wasm';
import { HubApiClient, EventEmitter, EWalletProvider, WalletClientConnector } from '$lib/services';
import { env } from '$env/dynamic/public';

import { uint8ArrayToBase64 } from '$lib/helpers';

export class HubService {
	private WalletClientConnector: WalletClientConnector;
	private readonly apiClient: HubApiClient;

	constructor() {
		this.apiClient = new HubApiClient({ host: env.PUBLIC_HUB_API });
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
			await this.sendTx(serializedSignedTx);
			eventEmitter.emit('transaction:send:success', { id });

			eventEmitter.emit('transaction:success', { id });
		} catch (error) {
			eventEmitter.emit('transaction:error', { id, error });
			throw error;
		}
	}

	public async sendTx(serializedTx: Uint8Array): Promise<void> {
		const base64Tx = uint8ArrayToBase64(serializedTx);
		await this.apiClient.post('/sequencer/txs', { body: base64Tx });
	}
}
