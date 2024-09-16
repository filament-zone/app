import type { IEligibilityCriteria } from '$lib/types';

export const checkIsCriteriaCompleted = (criteria: IEligibilityCriteria) =>
	Object.entries(criteria).every(([key, value]) => {
		if (key === 'completed') {
			return true;
		}
		if (key === 'contracts') {
			return value.length;
		}
		return Boolean(value);
	});
