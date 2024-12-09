import * as yup from 'yup';
import { checkIsCriteriaCompleted } from '$lib/features';
import type { Criterion } from '@filament-zone/filament/Criterion';

export const campaignAirDropStep2ValidationSchema = yup.object().shape({
	snapshotDate: yup.string().required('Snapshot Date is required'),
	snapshotInterval: yup.string().required('Snapshot Interval is required'),
	snapshotTotal: yup.string().required('Snapshots total value is required'),
	criteria: yup
		.array()
		.min(1, 'Select at least one criterion')
		.test(
			'Returns true if at least one completed',
			'Complete at least one criterion',
			(value: Criterion[] | undefined) => {
				if (Array.isArray(value)) {
					return !!value?.find((item) => checkIsCriteriaCompleted(item));
				}
			}
		)
});
