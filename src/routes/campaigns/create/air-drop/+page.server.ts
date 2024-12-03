import {
	generateMockDelegates,
	generateMockEligibilityCriteria,
	generateSnapshotIntervalOptions
} from '$lib/features';
import { ECampaignTimeSettings, EEligibilityCriteriaType, type IDropdownProps } from '$lib/types';

export const load = async () => {
	const delegates = generateMockDelegates();

	const step1Data = {
		title: 'Test Title',
		description: 'Test Description',
		maxEvictableDelegates: '3',
		activeDelegates: delegates.map((delegate) => delegate.id),
		evictedDelegates: []
	};

	const step2Data = {
		snapshotDate: '2024-12-31',
		snapshotInterval: '10',
		snapshotTotal: '5',
		criteria: generateMockEligibilityCriteria(3),
		meta: {
			timeSettingsOptions: [
				{ value: ECampaignTimeSettings.ONE_TIME, label: 'One Time' },
				{ value: ECampaignTimeSettings.RECURRING, label: 'Recurring' }
			] as IDropdownProps['options'],
			snapshotIntervalOptions: generateSnapshotIntervalOptions(),
			eligibilityCriteriaCategoryOptions: [
				{ value: 'all', label: 'All' },
				{ value: 'Balance', label: 'Balance' },
				{ value: 'Defi', label: 'DeFi' },
				{ value: 'Nft', label: 'NFT' },
				{ value: 'Gaming', label: 'Gaming' },
				{ value: 'Governance', label: 'Governance' }
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
		relativeShare: 5,
		totalAirDropSupply: 5,
		tokenContractAddress: 5,
		budgetFrom: 5,
		budgetTo: 10,
		bond: 5,
		meta: {
			visibilityOptions: [
				{ value: 'public', label: 'Public' },
				{ value: 'hidden', label: 'Hidden' }
			]
		}
	};

	return { delegates, step1Data, step2Data, step3Data };
};
