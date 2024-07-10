import { type BrowserProvider, ethers } from 'ethers';
import { MetamaskWalletClientBuilder } from '$lib/services';
import {
	type IWalletClientConnector,
	type EthereumError,
	type IEventEmitter,
	EWalletProviderError
} from '$lib/types';

export class MetamaskWalletClientConnector implements IWalletClientConnector {
	private readonly Client: BrowserProvider | null;
	private readonly ClientBuilder: MetamaskWalletClientBuilder;
	public EventEmitter: IEventEmitter;

	constructor(eventEmitter: IEventEmitter) {
		this.EventEmitter = eventEmitter;
		this.ClientBuilder = new MetamaskWalletClientBuilder();
		this.Client = this.ClientBuilder.build();
	}

	private async enableWindowProvider() {
		await this.Client?.getSigner();
	}

	public connect: IWalletClientConnector['connect'] = async () => {
		const isProviderConnected = await MetamaskWalletClientBuilder.isProviderConnected();

		if (MetamaskWalletClientBuilder.isWindowProviderAvailable()) {
			if (!isProviderConnected) {
				await this.enableWindowProvider()
					.then(() => {
						this.EventEmitter.emit('connect');
					})
					.catch((error: EthereumError) => {
						this.EventEmitter.emit('reject', this.createErrorPayload(error));
					});
			} else {
				this.EventEmitter.emit('connect');
			}
		} else {
			this.EventEmitter.emit('reject', { code: EWalletProviderError.METAMASK_NOT_AVAILABLE });
		}

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

	public switchChain: IWalletClientConnector['switchChain'] = async () => {
		await this.ClientBuilder?.MetamaskProvider?.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: '0x1' }]
		});
		return this;
	};

	public createErrorPayload(error: EthereumError): EthereumError {
		return {
			...error,
			code: this.getErrorByCode(error?.error?.code)
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
