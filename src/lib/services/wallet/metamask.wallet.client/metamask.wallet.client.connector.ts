import { type BrowserProvider, ethers, type EthersError, JsonRpcSigner } from 'ethers';
import { MetamaskWalletClientBuilder } from '$lib/services';
import { bigIntToHexId } from '$lib/helpers';
import {
	type IWalletClientConnector,
	type IEventEmitter,
	EWalletProviderError,
	type TransactionError
} from '$lib/types';

export class MetamaskWalletClientConnector implements IWalletClientConnector {
	private readonly Client: BrowserProvider | null;
	private readonly ClientBuilder: MetamaskWalletClientBuilder;
	public EventEmitter: IEventEmitter;
	public Signer: JsonRpcSigner | null;

	constructor(eventEmitter: IEventEmitter) {
		this.EventEmitter = eventEmitter;
		this.ClientBuilder = new MetamaskWalletClientBuilder();
		this.Client = this.ClientBuilder.build();
		this.Signer = null;
	}

	private async enableWindowProvider() {
		if (this.Client) {
			this.Signer = await this.Client.getSigner();
		}
	}

	public connect: IWalletClientConnector['connect'] = async () => {
		await this.enableWindowProvider()
			.then(() => {
				this.EventEmitter.emit('connect');
			})
			.catch((error: EthersError) => {
				console.error('Metamask connect error', error);
				const errorPayload = this.createErrorPayload(error);

				if (error.info?.error.code === EWalletProviderError.USER_REJECTED_REQUEST) {
					this.EventEmitter.emit('reject', errorPayload);
				} else {
					this.EventEmitter.emit('failure', errorPayload);
				}
			});

		this.ClientBuilder?.MetamaskProvider?.on('accountsChanged', (accounts) => {
			const acc = accounts.length
				? (accounts as string[]).map((account) => ({
						address: account
					}))
				: [];
			this.EventEmitter.emit('AccountsChanged', acc);
		});

		this.ClientBuilder?.MetamaskProvider?.on('chainChanged', (chain) => {
			this.EventEmitter.emit('ChainChanged', chain);
		});
		return this;
	};

	public disconnect: IWalletClientConnector['disconnect'] = () => {
		this?.ClientBuilder?.MetamaskProvider?.request({
			method: 'wallet_revokePermissions',
			params: [
				{
					eth_accounts: {}
				}
			]
		});
		this.EventEmitter.emit('disconnect');
		return this;
	};

	public getAccountInfo: IWalletClientConnector['getAccountInfo'] = async () => {
		await this.Client?.getSigner().then(async (signer) => {
			const chain = signer.provider._network;

			this.EventEmitter.emit('AccountInfo', [{ address: signer.address, chain }]);
		});
		return this;
	};

	public getAccountBalance: IWalletClientConnector['getAccountBalance'] = async (address) => {
		const balance = await this.Client?.getBalance(address);
		const formattedBalance = balance && ethers.formatEther(balance);
		this.EventEmitter.emit('AccountBalance', { balance: formattedBalance });
		return this;
	};

	public switchChain: IWalletClientConnector['switchChain'] = async (chainId) => {
		const hexId = bigIntToHexId(chainId);
		await this.ClientBuilder?.MetamaskProvider?.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: hexId }]
		});
		return this;
	};

	public createErrorPayload(error: EthersError): TransactionError {
		return {
			originalError: error,
			code: this.getErrorByCode(error?.info?.error?.code)
		};
	}

	public getErrorByCode(code?: number | string): EWalletProviderError {
		switch (String(code)) {
			case '-32002':
				return EWalletProviderError.REQUEST_PENDING;
			case '4001':
				return EWalletProviderError.USER_REJECTED_REQUEST;
			default:
				return EWalletProviderError.UNKNOWN;
		}
	}
}
