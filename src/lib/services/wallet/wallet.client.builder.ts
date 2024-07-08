import { MetamaskWalletClientBuilder } from '$lib/services';
import {
	type IWalletClientBuilder,
	type IWalletClientBuilderConstructorProps,
	type WalletClient,
	EWalletProvider
} from '$lib/types';

export class WalletClientBuilder implements IWalletClientBuilder {
	private ClientBuilder: IWalletClientBuilder;

	constructor({ walletProvider }: IWalletClientBuilderConstructorProps) {
		switch (walletProvider) {
			case EWalletProvider.METAMASK: {
				this.ClientBuilder = new MetamaskWalletClientBuilder();
				break;
			}
			default: {
				this.ClientBuilder = new MetamaskWalletClientBuilder();
				break;
			}
		}
	}

	public build = (): WalletClient | null => {
		if (!this.ClientBuilder) {
			console.log('Wallet client builder not initialized');
		}
		return this.ClientBuilder.build();
	};
}
