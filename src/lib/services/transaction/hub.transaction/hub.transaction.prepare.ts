import { ethers } from 'ethers';
import JSONBig from 'json-bigint';
import { get } from 'svelte/store';
import { PUBLIC_THE_HUB_CHAIN_ID } from '$env/static/public';
import { AccountHubApiClient } from '$lib/api';
import { EWalletProvider, WalletClientConnector } from '$lib/services';
import { walletStore } from '$lib/features';

export class HubTransactionPrepare {
	private readonly WalletClientConnector: WalletClientConnector;
	private readonly msg: object;
	private nonce: number;

	constructor({
		payload,
		walletClientConnector
	}: {
		payload: object;
		walletClientConnector: WalletClientConnector;
	}) {
		this.WalletClientConnector = walletClientConnector;
		this.msg = payload;
		this.nonce = 0;
	}

	public prepareTransaction = async (): Promise<Uint8Array | null> => {
		const { serialize_call, new_serialized_tx, new_unsigned_tx } = await import(
			'@filament-zone/filament/filament_hub_wasm'
		);
		const { initializeWallet, wallet } = walletStore;
		if (!get(wallet)?.address) {
			await initializeWallet(EWalletProvider.METAMASK);
		}

		try {
			await this.WalletClientConnector.connect();
			let address;
			await this.WalletClientConnector.getAccountInfo((data) => {
				address = (data as Array<{ address: string; chain: object }>)?.[0]?.address;
			});

			if (!address) {
				return null;
			}

			const res = await AccountHubApiClient.getAccountInfoByEthAddr(address);

			this.nonce = res.data?.nonce ? res.data?.nonce : 0;

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
