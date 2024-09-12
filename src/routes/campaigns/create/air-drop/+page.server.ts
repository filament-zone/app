import type { IDelegate } from '$lib/types';

export const load = async () => {
	const activeDelegatesTable = {
		tableLabel: 'Active Delegates',
		data: [
			{
				id: '1',
				name: '#1 ZackXBT',
				value: '0.12',
				votingPower: '213413434',
				evictionCost: '12145',
				selected: false
			},
			{
				id: '2',
				name: '#2 CryptoWhale',
				value: '0.80',
				votingPower: '182344123',
				evictionCost: '15432',
				selected: false
			},
			{
				id: '3',
				name: '#3 ChainAnalyzer',
				value: '0.08',
				votingPower: '98765432',
				evictionCost: '11321',
				selected: true
			},
			{
				id: '4',
				name: '#4 BlockWatcher',
				value: '0.18',
				votingPower: '123456789',
				evictionCost: '1324columnDef5',
				selected: false
			},
			{
				id: '5',
				name: '#5 CoinHunter',
				value: '0.35',
				votingPower: '456789123',
				evictionCost: '16532',
				selected: false
			}
		] as IDelegate[]
	};
	const evictedDelegatesTable = {
		tableLabel: 'Evicted Delegates',
		data: [
			{
				id: '6',
				name: '#6 DeFiMaster',
				value: '0.50',
				votingPower: '345678910',
				evictionCost: '14230',
				selected: false
			},
			{
				id: '7',
				name: '#7 NFTKing',
				value: '0.95',
				votingPower: '987654321',
				evictionCost: '15874',
				selected: true
			},
			{
				id: '8',
				name: '#8 Web3Guru',
				value: '0.22',
				votingPower: '234567890',
				evictionCost: '12654',
				selected: false
			},
			{
				id: '9',
				name: '#9 MetaTrader',
				value: '0.67',
				votingPower: '765432109',
				evictionCost: '13500',
				selected: false
			},
			{
				id: '10',
				name: '#10 WhaleWatcher',
				value: '0.44',
				votingPower: '543210987',
				evictionCost: '14475',
				selected: true
			}
		] as IDelegate[]
	};

	const step1Data = {
		title: 'Test Title',
		description: 'Test Description',
		maxEvictableDelegates: '5',
		activeDelegatesTable,
		evictedDelegatesTable
	};

	return {
		step1Data
	};
};