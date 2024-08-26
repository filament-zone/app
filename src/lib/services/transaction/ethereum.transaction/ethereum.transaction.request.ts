import type { EthersError, InterfaceAbi } from 'ethers';
import {
	WalletClientConnector,
	EthereumContract,
	EWalletProvider,
	EWalletProviderError
} from '$lib/services';
import { TransactionClientEventsEmitCreator } from '../transaction.client.eventsEmitCreator';

interface RunParams {
	scAddress: string;
	walletClientConnector: WalletClientConnector;
	method: string;
	args: unknown[];
}

export class TransactionRequest extends TransactionClientEventsEmitCreator {
	private readonly abi: InterfaceAbi;

	constructor({ abi }: { abi: InterfaceAbi }) {
		super();
		this.abi = abi;
	}

	public run = async ({
		scAddress,
		method,
		args = [],
		walletClientConnector
	}: RunParams): Promise<void> => {
		const successEmitSubscribers = this.successEmitCreator(method, EWalletProvider.METAMASK);
		const failureEmitSubscribers = this.failureEmitCreator(method, EWalletProvider.METAMASK);
		const rejectEmitSubscribers = this.rejectEmitCreator(method, EWalletProvider.METAMASK);

		walletClientConnector.EventEmitter.on('connect', async () => {
			try {
				const ethereumContract = new EthereumContract(scAddress, walletClientConnector, this.abi);

				await ethereumContract.contract[method](...args)
					.then((res) => {
						walletClientConnector.EventEmitter.emit('success', res);
						successEmitSubscribers(res);
					})
					.catch((error: EthersError) => {
						const errorPayload = walletClientConnector.Client.createErrorPayload(error);
						if (error.info?.error.code === EWalletProviderError.USER_REJECTED_REQUEST) {
							walletClientConnector.EventEmitter.emit('reject');
							rejectEmitSubscribers({ error: errorPayload });
						} else {
							walletClientConnector.EventEmitter.emit('failure');
							failureEmitSubscribers({ error });
						}
					});
			} catch (error) {
				console.error('Catch general ETH run error', error);
				walletClientConnector.disconnect();
			}
		});
		await walletClientConnector.connect();
	};
}
