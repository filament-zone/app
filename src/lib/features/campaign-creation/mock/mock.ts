import { v4 as uuidv4 } from 'uuid';
import type { CriterionCategory } from '@filament-zone/filament/CriterionCategory';
import {
	ECampaignTimeSettings,
	EEligibilityCriteriaType,
	type ICampaign,
	type IDelegate,
	type IDropdownProps
} from '$lib/types';
import type { Criterion } from '@filament-zone/filament/Criterion';

export const generateMockEligibilityCriteria = (quantity: number): Criterion[] => {
	const categories = ['Balance', 'Defi', 'Gaming', 'Governance', 'Nft'] as CriterionCategory[];
	const types = Object.values(EEligibilityCriteriaType);

	const networks = ['Ethereum', 'Polygon', 'BNB', 'Avalanche'];

	return Array.from({ length: quantity }, () => {
		const randomCategory = categories[
			Math.floor(Math.random() * categories.length)
		] as CriterionCategory;
		const randomType = types[Math.floor(Math.random() * types.length)];
		const randomNetwork = networks[Math.floor(Math.random() * networks.length)];

		return {
			// id: uuidv4(),
			name: `${randomType.replace(/-/g, ' ')} on ${randomNetwork}`,
			category: randomCategory,
			// type: EEligibilityCriteriaType.TVL_BY_CONTRACT,
			// tvl: (Math.random() * 100).toFixed(2),
			weight: BigInt((Math.random() * 10).toFixed(0)),
			// contracts: [
			// 	{
			// 		network: randomNetwork,
			// 		address: `0x${Math.random().toString(36).substring(2, 42)}`
			// 	}
			// ]
			parameters: {}
		};
	});
};

function generateMockCampaign(): ICampaign {
	return {
		createdAt: new Date().toISOString(),
		title: `Campaign ${Math.random().toString(36).substring(7)}`,
		description: `This is a mock campaign description.`,
		maxEvictableDelegates: Math.floor(Math.random() * 100).toString(),
		activeDelegates: Array.from({ length: 3 }, () => uuidv4()),
		evictedDelegates: Array.from({ length: 2 }, () => uuidv4()),
		timeSettings: ECampaignTimeSettings.ONE_TIME,
		snapshotDate: new Date().toISOString(),
		snapshotStartDateRecurring: new Date().toISOString(),
		snapshotInterval: `${Math.floor(Math.random() * 1000)} seconds`,
		snapshotTotal: (Math.random() * 1000).toFixed(2),
		snapshotEndDateRecurring: null,
		criteria: generateMockEligibilityCriteria(3),
		visibility: 'public',
		relativeShare: (Math.random() * 100).toFixed(2),
		totalAirDropSupply: (Math.random() * 10000).toFixed(2),
		tokenContractAddress: `0x${Math.random().toString(36).substring(2, 42)}`,
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

const names = [
	'ZackXBT',
	'CryptoWhale',
	'ChainAnalyzer',
	'BlockWatcher',
	'CoinHunter',
	'DeFiMaster',
	'NFTKing',
	'Web3Guru',
	'MetaTrader',
	'WhaleWatcher'
];

export const generateMockDelegates = (count: number = 10): IDelegate[] => {
	return Array.from({ length: count }, (_, index) => {
		const randomName = names[index % names.length] || `Delegate ${index + 1}`;
		return {
			id: uuidv4(),
			name: `#${index + 1} ${randomName}`,
			value: Math.random().toFixed(2),
			votingPower: Math.floor(Math.random() * 1_000_000_000),
			evictionCost: Math.floor(Math.random() * 20_000)
		};
	});
};

export const generateSnapshotIntervalOptions = (): IDropdownProps['options'] => {
	const options: IDropdownProps['options'] = [];
	for (let i = 1; i <= 14; i++) {
		options.push({ value: i.toString(), label: `${i} Day${i > 1 ? 's' : ''}` });
	}
	return options;
};
