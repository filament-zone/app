import type { IHubTransactionConstructorProps } from '$lib/types';

export class HubTransaction {
	public chainId: number;
	public maxPriorityFeeBips: number;
	public maxFee: number;
	public nonce: number;
	public msg: Uint8Array;
	public signature: Uint8Array | null;

	constructor({
		chainId,
		maxPriorityFeeBips,
		maxFee,
		nonce,
		msg,
		signature = null
	}: IHubTransactionConstructorProps) {
		this.chainId = chainId;
		this.msg = msg;
		this.maxPriorityFeeBips = maxPriorityFeeBips;
		this.maxFee = maxFee;
		this.nonce = nonce;
		this.signature = signature;
	}
}

export const HubTransactionSchema = new Map([
	[
		HubTransaction,
		{
			kind: 'struct',
			fields: [
				['chainId', 'u32'],
				['maxPriorityFeeBips', 'u64'],
				['maxFee', 'u64'],
				['nonce', 'u64'],
				['msg', ['u8']],
				['signature', ['u8']]
			]
		}
	]
]);
