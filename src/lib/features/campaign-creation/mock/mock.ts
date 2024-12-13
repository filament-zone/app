import { v4 as uuidv4 } from 'uuid';
import type { CriterionCategory } from '@filament-zone/filament/CriterionCategory';
import { type IDelegate, type IDropdownProps } from '$lib/types';
import type { Criterion } from '@filament-zone/filament/Criterion';
import { EEligibilityCriteriaType } from '$lib/api/hub/campaign/campaign.hub.api.enums';

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

function getRandomDate(start: Date, end: Date): string {
	const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	return date.toISOString().split('T')[0];
}

function getRandomStatus(): string {
	const statuses = ['Approved', 'Rejected'];
	return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomName(): string {
	const names = ['ZachXBT', 'Alice', 'Bob', 'Charlie', 'Dave'];
	return names[Math.floor(Math.random() * names.length)];
}

export function generateRandomTickerData(
	count: number
): { name: string; date: string; status: string }[] {
	const data = [];
	for (let i = 0; i < count; i++) {
		data.push({
			name: getRandomName(),
			date: getRandomDate(new Date(2021, 0, 1), new Date(2021, 11, 31)),
			status: getRandomStatus()
		});
	}
	return data;
}
