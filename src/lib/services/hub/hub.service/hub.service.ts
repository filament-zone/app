import { ethers, SigningKey } from 'ethers';
import { hexToBytes } from 'ethereum-cryptography/utils';
import { new_serialized_tx, new_serialized_unsigned_tx } from 'filament-hub-wasm';
import { env } from '$env/dynamic/public';
import { HubApiClient, EventEmitter, EWalletProvider, WalletClientConnector } from '$lib/services';
import { CHAIN_IDS } from '$lib/constants';
import { EChain } from '$lib/types';
import { uint8ArrayToBase64 } from '$lib/helpers';

export class HubService {
	private WalletClientConnector: WalletClientConnector;
	private readonly apiClient: HubApiClient;

	constructor() {
		this.apiClient = new HubApiClient({ host: '' });
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
		msg: Uint8Array;
		eventEmitter: EventEmitter;
	}): Promise<null | void> {
		eventEmitter.emit('transaction:start', { id, msg });

		try {
			await this.WalletClientConnector.connect();

			const nonce = await this.WalletClientConnector.Client.Signer?.getNonce();

			if (!nonce) {
				return null;
			}

			const chainId = BigInt(CHAIN_IDS[env.PUBLIC_DEFAULT_CHAIN as EChain]);
			const feeData = await this.WalletClientConnector.BrowserProvider?.getFeeData();

			if (!feeData?.maxFeePerGas || !feeData?.maxPriorityFeePerGas) {
				return null;
			}

			const maxFee = feeData.maxFeePerGas;
			const maxPriorityFee = feeData.maxPriorityFeePerGas;

			const serializedUnsignedTx = new_serialized_unsigned_tx(
				msg,
				chainId,
				maxPriorityFee,
				maxFee,
				BigInt(nonce)
			);

			if (!serializedUnsignedTx) {
				return null;
			}

			const signature =
				await this.WalletClientConnector.Client.Signer?.signMessage(serializedUnsignedTx);
			if (!signature) {
				return null;
			}

			const messageHashHex = ethers.hashMessage(serializedUnsignedTx);
			const messageHash = hexToBytes(messageHashHex);

			const recoveredPublicKey = SigningKey.recoverPublicKey(messageHash, signature);
			const unCompressedPublicKey = ethers.SigningKey.computePublicKey(recoveredPublicKey, false);
			const publicKey = hexToBytes(unCompressedPublicKey.slice(2));
			const formattedSignature = hexToBytes(signature.slice(2));

			const serializedSignedTx = new_serialized_tx(
				publicKey,
				formattedSignature,
				serializedUnsignedTx,
				chainId,
				maxPriorityFee,
				maxFee,
				BigInt(nonce)
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
		await this.apiClient.post('/txs', { body: base64Tx });
	}
}
