import { v4 as uuidv4 } from 'uuid';
import {
	EEligibilityCriteriaCategory,
	EEligibilityCriteriaType,
	type ICampaign,
	type IEligibilityCriteria
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
		selectedActiveDelegates: Array.from({ length: 3 }, () => uuidv4()), // Mock 3 delegates
		selectedEvictedDelegates: Array.from({ length: 2 }, () => uuidv4()), // Mock 2 evicted delegates
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
