import { v4 as uuidv4 } from 'uuid';
import {
	EEligibilityCriteriaCategory,
	EEligibilityCriteriaType,
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
