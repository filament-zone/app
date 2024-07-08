export interface IEthereumErrorPayload {
	method: string;
	params: unknown[];
}

export interface EthereumError {
	code: string;
	error: {
		code: number;
		payload: IEthereumErrorPayload;
	};
	payload: IEthereumErrorPayload;
	shortMessage: string;
	message: string;
	stack: string;
}
