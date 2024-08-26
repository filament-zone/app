import { EChain } from '$lib/services/wallet/wallet.client.types';

export const CHAIN_IDS: Record<EChain, bigint> = {
	[EChain.ETHEREUM_MAINNET]: 1n,
	[EChain.SEPOLIA_TESTNET]: 11155111n
};

export const CHAIN_NAMES: Record<EChain, string> = {
	[EChain.ETHEREUM_MAINNET]: 'Ethereum Mainnet',
	[EChain.SEPOLIA_TESTNET]: 'Sepolia Testnet'
};
