import { v4 as uuidv4 } from 'uuid';
import {
	EEligibilityCriteriaCategory,
	EEligibilityCriteriaType,
	type ICampaign,
	type IEligibilityCriteria,
	type IDelegate
} from '$lib/types';

export const generateMockEligibilityCriteria = (quantity: number): IEligibilityCriteria[] => {
	const categories = Object.values(EEligibilityCriteriaCategory);
	const types = Object.values(EEligibilityCriteriaType);

	const networks = ['Ethereum', 'Polygon', 'BNB', 'Avalanche'];

	return Array.from({ length: quantity }, () => {
		const randomCategory = categories[
			Math.floor(Math.random() * categories.length)
		] as EEligibilityCriteriaCategory;
		const randomType = types[Math.floor(Math.random() * types.length)];
		const randomNetwork = networks[Math.floor(Math.random() * networks.length)];

		return {
			id: uuidv4(),
			name: `${randomType.replace(/-/g, ' ')} on ${randomNetwork}`,
			category: randomCategory,
			type: EEligibilityCriteriaType.TVL_BY_CONTRACT,
			tvl: (Math.random() * 100).toFixed(2),
			weight: (Math.random() * 10).toFixed(0),
			contracts: [
				{
					network: randomNetwork,
					address: `0x${Math.random().toString(36).substring(2, 42)}`
				}
			],
			completed: false
		};
	});
};

function generateMockCampaign(): ICampaign {
	return {
		createdAt: new Date().toISOString(),
		title: `Campaign ${Math.random().toString(36).substring(7)}`,
		description: `This is a mock campaign description.`,
		maxEvictableDelegates: Math.floor(Math.random() * 100).toString(),
		activeDelegates: Array.from({ length: 3 }, () => uuidv4()), // Mock 3 governance
		evictedDelegates: Array.from({ length: 2 }, () => uuidv4()), // Mock 2 evicted governance
		snapshotDate: new Date().toISOString(),
		snapshotInterval: `${Math.floor(Math.random() * 1000)} seconds`,
		snapshotTotal: (Math.random() * 1000).toFixed(2),
		criteria: generateMockEligibilityCriteria(3),
		visibility: 'public',
		relativeShare: (Math.random() * 100).toFixed(2),
		totalAirDropSupply: (Math.random() * 10000).toFixed(2),
		tokenContractAddress: `0x${Math.random().toString(36).substring(2, 42)}`,
		indexer: `Indexer-${Math.random().toString(36).substring(2, 10)}`,
		budgetFrom: (Math.random() * 5000).toFixed(2),
		budgetTo: (Math.random() * 10000).toFixed(2),
		bond: (Math.random() * 100).toFixed(2),
		collateralStatus: {
			date: new Date().toISOString(),
			status: 'processing'
		}
	};
}

export function generateMockCampaigns(quantity: number): ICampaign[] {
	return Array.from({ length: quantity }, generateMockCampaign);
}

export const generateMockDelegates = (): IDelegate[] => {
	return [
		{
			id: uuidv4(),
			name: '#1 ZackXBT',
			value: '0.12',
			votingPower: '213413434',
			evictionCost: '12145'
		},
		{
			id: uuidv4(),
			name: '#2 CryptoWhale',
			value: '0.80',
			votingPower: '182344123',
			evictionCost: '15432'
		},
		{
			id: uuidv4(),
			name: '#3 ChainAnalyzer',
			value: '0.08',
			votingPower: '98765432',
			evictionCost: '11321'
		},
		{
			id: uuidv4(),
			name: '#4 BlockWatcher',
			value: '0.18',
			votingPower: '123456789',
			evictionCost: '1324'
		},
		{
			id: uuidv4(),
			name: '#5 CoinHunter',
			value: '0.35',
			votingPower: '456789123',
			evictionCost: '16532'
		},
		{
			id: uuidv4(),
			name: '#6 DeFiMaster',
			value: '0.50',
			votingPower: '345678910',
			evictionCost: '14230'
		},
		{
			id: uuidv4(),
			name: '#7 NFTKing',
			value: '0.95',
			votingPower: '987654321',
			evictionCost: '15874'
		},
		{
			id: uuidv4(),
			name: '#8 Web3Guru',
			value: '0.22',
			votingPower: '234567890',
			evictionCost: '12654'
		},
		{
			id: uuidv4(),
			name: '#9 MetaTrader',
			value: '0.67',
			votingPower: '765432109',
			evictionCost: '13500'
		},
		{
			id: uuidv4(),
			name: '#10 WhaleWatcher',
			value: '0.44',
			votingPower: '543210987',
			evictionCost: '14475'
		}
	];
};
