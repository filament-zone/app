import {
	EventEmitter,
	type IWalletClientConnector,
	MetamaskWalletClientConnector,
	EWalletProvider
} from '$lib/services';
import type { IEventEmitter, IWalletClientConnectorConstructorProps } from '$lib/types';

import { removeFromLocalStorage } from '$lib/utils';

export class WalletClientConnector implements IWalletClientConnector {
	private _connected = false;

	private readonly Client: IWalletClientConnector;

	public EventEmitter: IEventEmitter;

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

	public on: IWalletClientConnector['on'] = (event, callback): WalletClientConnector => {
		this.EventEmitter.on(event, callback);
		return this;
	};

	public off: IWalletClientConnector['off'] = (event, callback): WalletClientConnector => {
		this.EventEmitter.off(event, callback);
		return this;
	};

	public connect: IWalletClientConnector['connect'] = async (
		cb
	): Promise<WalletClientConnector> => {
		if (cb) {
			this.EventEmitter.on('connect', cb);
		}
		this.EventEmitter.on('connect', () => {
			this._connected = true;
		});

		await this.Client.connect();

		return this;
	};

	public disconnect: IWalletClientConnector['disconnect'] = (cb): WalletClientConnector => {
		if (cb) {
			this.EventEmitter.on('disconnect', cb);
		}
		this.Client.disconnect();
		this.EventEmitter.clearAll();
		this._connected = false;
		removeFromLocalStorage('prevWallet');
		alert('Wallet disconnected');
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

	public switchChain: IWalletClientConnector['switchChain'] = async () => {
		await this.Client.switchChain();
		return this;
	};
}
