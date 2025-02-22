import { v4 as uuidv4 } from 'uuid';
import type { CriterionCategory } from '@filament-zone/filament/CriterionCategory';
import {
	ECampaignPhase,
	ECampaignTimeSettings,
	type ICampaign,
	type IDelegate,
	type IDropdownProps
} from '$lib/types';
import type { Criterion } from '@filament-zone/filament/Criterion';
import { EEligibilityCriteriaType } from '$lib/api/campaign/campaign.hub.api.enums';

export const generateMockEligibilityCriteria = (quantity: number): Criterion[] => {
	const categories = ['Balance', 'Defi', 'Nft'] as CriterionCategory[];
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
			network: randomNetwork,
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

const phases = ['Draft', 'Criteria', 'Data Indexing', 'Distribution Voting', 'Token Distribution'];

const getNumericPhase = (phase: number): number => {
	return phases.indexOf(phase.toString());
};

export function generateMockCampaign(): ICampaign {
	const randomPhase = phases[Math.floor(Math.random() * phases.length)];

	const campaign: ICampaign = {
		// From `Campaign` type
		id: BigInt(Math.floor(Math.random() * 1_000_000)),
		campaigner: `Campaigner_${Math.random().toString(36).substring(2, 7)}`,
		phase: randomPhase as ECampaignPhase,
		numericPhase: getNumericPhase(Number(randomPhase)),
		title: `Elrond Airdrop Round ${Math.floor(Math.random() * 5)}`,
		description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`,
		criteria: generateMockEligibilityCriteria(3),
		evictions: Array.from({ length: 2 }, () => uuidv4()),
		delegates: Object.fromEntries(Array.from({ length: 3 }, () => [uuidv4(), 100n])),
		indexer: null,

		// From `ICampaign` type
		createdAt: new Date().toISOString(),
		timeSettings: {
			selectedType: ECampaignTimeSettings.ONE_TIME,
			[ECampaignTimeSettings.ONE_TIME]: {
				date: new Date().toISOString()
			},
			[ECampaignTimeSettings.RECURRING]: {
				startDate: new Date().toISOString(),
				endDate: null,
				interval: `${Math.floor(Math.random() * 10) + 1} days`,
				total: (Math.random() * 100).toFixed(2)
			}
		},
		visibility: 'public',
		relativeShare: (Math.random() * 100).toFixed(2),
		totalAirDropSupply: (Math.random() * 10000).toFixed(2),
		tokenContractAddress: `0x${Math.random().toString(36).substring(2, 42)}`,
		indexerPrice: (Math.random() * 5000).toFixed(2),
		indexerPriceUSD: (Math.random() * 10000).toFixed(2),
		bond: (Math.random() * 100).toFixed(2)
	};
	return campaign;
}
