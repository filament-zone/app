import type { Criterion } from '@filament-zone/filament/Criterion';

export const checkIsCriteriaCompleted = (criteria: Criterion) =>
	Object.values(criteria).every((value) => Boolean(value));
