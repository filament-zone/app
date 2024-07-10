import { get, writable } from 'svelte/store';
import { modalStore, toastsStore } from '$lib/features';
import { EWalletProviderError, WalletClientConnector } from '$lib/services';
import { writeToLocalStorage } from '$lib/utils';
import {
	EModalVariant,
	type EthereumError,
	EWalletProvider,
	type IAccountBalance,
	type IAccountInfo,
	type IModalConfirmationProps,
	type IWalletState,
	type IWalletStore
} from '$lib/types';
import { CHAIN_IDS } from '$lib/constants';
import { shortCutTransactionHash } from '$lib/helpers';

const { closeModal } = modalStore;

const initialState: IWalletState = {
	address: null,
	network: null,
	connected: false,
	client: null,
	chain: {
		chainId: null,
		name: null
	},
	balance: null
};

export const wallet = writable<IWalletState>(initialState);

const initializeWallet = async (walletProvider: EWalletProvider) => {
	const { send } = toastsStore;
	const client = new WalletClientConnector({ walletProvider });

	if (!client.on) return;

	client.on('connect', async () => {
		await client.getAccountInfo((payload) => {
			const data = payload as IAccountInfo[];

			wallet.update((state) => ({
				...state,
				client,
				address: data[0].address ?? '',
				connected: true,
				chain: data[0].chain
			}));
			writeToLocalStorage('prevWallet', walletProvider);
			closeModal();
			send({ message: `Address connected: ${shortCutTransactionHash(data[0].address)}` });
		});

		await client.getAccountBalance(get(wallet).address ?? '', (payload) => {
			const data = payload as IAccountBalance;
			wallet.update((state) => ({
				...state,
				client,
				balance: data.balance ?? ''
			}));
		});
	});

	client.on('AccountsChanged', async (payload) => {
		const accountInfo = payload as IAccountInfo[];

		if (accountInfo[0]?.address) {
			send({
				message: `New address connected: ${shortCutTransactionHash(accountInfo[0]?.address)}`
			});
		} else {
			wallet.set({ ...initialState });
			send({ message: `Address disconnected` });
			return;
		}

		await client.getAccountBalance(accountInfo[0]?.address ?? '', (payload) => {
			const accountBalance = payload as IAccountBalance;
			wallet.update((state) => ({
				...state,
				address: accountInfo[0]?.address ?? '',
				balance: accountBalance.balance ?? ''
			}));
		});
	});

	client.on('ChainChanged', () => {
		window.location.reload();
	});

	client.on('reject', (error) => {
		switch ((error as EthereumError).code) {
			case EWalletProviderError.REQUEST_PENDING:
				send({ message: 'Open metamask extension and accept the request' });
				break;
			case EWalletProviderError.METAMASK_NOT_AVAILABLE:
				send({ message: 'Metamask extension not available' });
				break;
			default:
				console.log('error');
				break;
		}
	});

	await client.connect();

	if (client._connected) {
		send({ message: 'Connected to wallet' });
	} else {
		send({ message: 'Failed to connect to wallet' });
	}
};

wallet.subscribe((state) => {
	const { openModal } = modalStore;
	if (state.chain?.chainId && state.chain.chainId !== CHAIN_IDS.ETHEREUM_MAINNET) {
		openModal({
			variant: EModalVariant.CONFIRMATION,
			state: {
				title: 'Change Network',
				description:
					'You are on a wrong network, click "Change network" to switch to Ethereum Mainnet',
				disabledDeny: true,
				onConfirm: () => {
					state.client?.switchChain();
				},
				onConfirmLabel: 'Change network'
			} as IModalConfirmationProps
		});
	}
});

const disconnectWallet = () => {
	const { send } = toastsStore;
	get(wallet).client?.disconnect();
	wallet.set({ ...initialState });
	send({ message: 'Disconnected from wallet' });
};

export const walletStore: IWalletStore = {
	wallet,
	initializeWallet,
	disconnectWallet
};
