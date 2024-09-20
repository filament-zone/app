import {
	type IWalletClientConnector,
	MetamaskWalletClientConnector,
	EWalletProvider,
	EventEmitter
} from '$lib/services';
import type { IEventEmitter, IWalletClientConnectorConstructorProps } from '$lib/types';

import { removeFromLocalStorage } from '$lib/utils';

export class WalletClientConnector implements IWalletClientConnector {
	public readonly Client: IWalletClientConnector;
	public BrowserProvider: IWalletClientConnector['BrowserProvider'];
	public EventEmitter: IEventEmitter;
	public _connected = false;

	constructor({ walletProvider }: IWalletClientConnectorConstructorProps) {
		this.EventEmitter = new EventEmitter();
		switch (walletProvider) {
			case EWalletProvider.METAMASK: {
				this.Client = new MetamaskWalletClientConnector(this.EventEmitter);
				break;
			}
			default: {
				this.Client = new MetamaskWalletClientConnector(this.EventEmitter);
			}
		}
	}

	public on: IWalletClientConnector['on'] = (event, callback) => {
		this.EventEmitter.on(event, callback);
		return this;
	};

	public off: IWalletClientConnector['off'] = (event, callback) => {
		this.EventEmitter.off(event, callback);
		return this;
	};

	public connect: IWalletClientConnector['connect'] = async (cb) => {
		if (cb) {
			this.EventEmitter.on('connect', cb);
		}
		this.EventEmitter.on('connect', () => {
			this._connected = true;
		});

		this.BrowserProvider = await this.Client.connect();

		return this.BrowserProvider;
	};

	public disconnect: IWalletClientConnector['disconnect'] = (cb) => {
		if (cb) {
			this.EventEmitter.on('disconnect', cb);
		}
		this.Client.disconnect();
		this.EventEmitter.clearAll();
		this._connected = false;
		removeFromLocalStorage('prevWallet');
		return this;
	};

	public getAccountInfo: IWalletClientConnector['getAccountInfo'] = async (cb) => {
		if (cb) {
			this.EventEmitter.on('AccountInfo', cb as (data: unknown) => void);
		}
		await this.Client.getAccountInfo();
		return this;
	};

	public readonly client = (): IWalletClientConnector => {
		return this.Client;
	};

	public getAccountBalance: IWalletClientConnector['getAccountBalance'] = async (address, cb) => {
		if (cb) {
			this.EventEmitter.on('AccountBalance', (data) => {
				cb(data);
			});
		}
		await this.Client.getAccountBalance(address);
		return this;
	};

	public switchChain: IWalletClientConnector['switchChain'] = async (chainId) => {
		await this.Client.switchChain(chainId);
		return this;
	};

	public createErrorPayload: IWalletClientConnector['createErrorPayload'] = (payload) => {
		return this.Client.createErrorPayload(payload);
	};
}
