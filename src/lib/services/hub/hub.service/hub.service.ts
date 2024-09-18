// import * as borsh from 'borsh';
// import { ethers } from 'ethers';

import { HubRpcClient, EventEmitter, HubTransaction } from '$lib/services';

export class HubService {
	private readonly rpcClient: HubRpcClient;
	// private readonly walletClientConnector: WalletClientConnector;

	constructor() {
		this.rpcClient = new HubRpcClient();
		// this.walletClientConnector = walletClientConnector;
	}

	public async processHubTransaction({
		id,
		msg,
		eventEmitter
	}: {
		id: string;
		msg: Uint8Array;
		eventEmitter: EventEmitter;
	}): Promise<void> {
		eventEmitter.emit('transaction:start', { id, msg });

		try {
			eventEmitter.emit('transaction:create:start', { id, msg });
			const transaction = await this.createTx(msg);
			eventEmitter.emit('transaction:create:success', { id, transaction });
			// eventEmitter.emit('transaction:sign:start', { id: transactionId, transaction });
			// const signedTransaction = await this.signTx(transaction);
			// eventEmitter.emit('transaction:sign:success', { id: transactionId, signedTransaction });
			//
			// eventEmitter.emit('transaction:serialize:start', { id: transactionId, signedTransaction });
			// const serializedTx = this.serializeTx(signedTransaction);
			// eventEmitter.emit('transaction:serialize:success', { id: transactionId, serializedTx });
			//
			// eventEmitter.emit('transaction:send:start', { id: transactionId, serializedTx });
			// await this.sendTx(serializedTx);
			// eventEmitter.emit('transaction:send:success', { id: transactionId, serializedTx });
			//
			// eventEmitter.emit('transaction:success', { id: transactionId });
		} catch (error) {
			eventEmitter.emit('transaction:error', { id, error });
			throw error;
		}
	}

	private async createTx(msg: Uint8Array): Promise<HubTransaction> {
		const nonce = await this.fetchAccountNonce();
		const chainId = 1;
		const maxPriorityFeeBips = 100;
		const maxFee = 10000;
		const signature = null;

		return new HubTransaction({
			chainId,
			maxPriorityFeeBips,
			maxFee,
			nonce,
			msg,
			signature
		});
	}

	// private async signTx(transaction: HubTransaction): Promise<HubTransaction> {
	// 	const signer = this.walletClientConnector.getSigner();
	// 	const signature = await signer.signMessage(transaction.msg);
	// 	transaction.signature = ethers.utils.arrayify(signature);
	// 	return transaction;
	// }
	//
	// private serializeTx(transaction: HubTransaction): Uint8Array {
	// 	return borsh.serialize(HubTransactionSchema, transaction);
	// }
	//
	// private async sendTx(serializedTx: Uint8Array): Promise<void> {
	// 	const txBody = ethers.utils.hexlify(serializedTx);
	// 	await this.rpcClient.send('sequencer_acceptTx', [{ body: txBody }]);
	// 	await this.rpcClient.send('sequencer_publishBatch', [txBody]);
	// }

	private async fetchAccountNonce(): Promise<number> {
		const account = await this.rpcClient.send<{ nonce: number }>('accounts_getAccount', []);
		return account.nonce;
	}
}
