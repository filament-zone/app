import * as yup from 'yup';
import { checkIsCriteriaCompleted } from '$lib/features';
import type { Criterion } from '@filament-zone/filament/Criterion';
import { ECampaignTimeSettings } from '$lib/api/campaign/campaign.hub.api.enums';

export const campaignAirDropStep2ValidationSchema = yup.object().shape({
	timeSettings: yup.object().shape({
		selectedType: yup
			.string()
			.oneOf(Object.values(ECampaignTimeSettings))
			.required('Select a time setting type'),

		[ECampaignTimeSettings.ONE_TIME]: yup.object().shape({
			date: yup.string().required('Select a date')
		})
	}),
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
