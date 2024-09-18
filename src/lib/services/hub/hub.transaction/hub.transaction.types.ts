export interface IHubTransactionConstructorProps {
	chainId: number;
	maxPriorityFeeBips: number;
	maxFee: number;
	nonce: number;
	msg: Uint8Array;
	signature: Uint8Array | null;
}
