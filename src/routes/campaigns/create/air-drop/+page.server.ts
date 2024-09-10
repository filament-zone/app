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
				evictionCost: '13245',
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
	const evictedDelegatesTable = {};
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
