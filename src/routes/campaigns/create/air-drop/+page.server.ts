import { generateMockDelegates, generateMockEligibilityCriteria } from '$lib/features';
import { EEligibilityCriteriaType, type IDropdownProps } from '$lib/types';

export const load = async () => {
	const delegates = generateMockDelegates();

	const step1Data = {
		title: 'Test Title',
		description: 'Test Description',
		maxEvictableDelegates: '3',
		activeDelegates: delegates.map((delegate) => delegate.id),
		evictedDelegates: []
	};

	const eligibilityCriteriaTable = {
		tableLabel: '',
		data: generateMockEligibilityCriteria(15)
	};

	const step2Data = {
		snapshotDate: '2024-12-31',
		snapshotInterval: '10',
		snapshotTotal: '5',
		eligibilityCriteriaTable,
		meta: {
			snapshotIntervalOptions: [
				{ value: '10', label: '10' },
				{ value: '20', label: '20' },
				{ value: '30', label: '30' }
			] as IDropdownProps['options'],
			eligibilityCriteriaCategoryOptions: [
				{ value: 'all', label: 'All' },
				{ value: 'balance', label: 'Balance' },
				{ value: 'defi', label: 'DeFi' },
				{ value: 'governance', label: 'Governance' },
				{ value: 'nft', label: 'NFT' },
				{ value: 'total', label: 'Gaming' }
			],
			eligibilityCriteriaTypeOptions: Object.values(EEligibilityCriteriaType).map(
				(criteriaType) => {
					const result = criteriaType.replace(/-/g, ' ').toLocaleLowerCase();
					const finalResult = result.replace(/\b\w+/g, (word) => {
						return word === 'by' ? word : word.charAt(0).toUpperCase() + word.slice(1);
					});

					return {
						value: criteriaType,
						label: finalResult
					};
				}
			)
		}
	};

	const step3Data = {
		visibility: 'public',
		relativeShare: null,
		totalAirDropSupply: null,
		tokenContractAddress: null,
		indexer: 'internal',
		budgetFrom: null,
		budgetTo: null,
		bond: null,
		meta: {
			visibilityOptions: [
				{ value: 'public', label: 'Public' },
				{ value: 'hidden', label: 'Hidden' }
			],
			indexerOptions: [
				{ value: 'internal', label: 'Internal' },
				{ value: 'external', label: 'External' }
			]
		}
	};

	return { delegates, step1Data, step2Data, step3Data };
};
