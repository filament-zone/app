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
			date: yup
				.string()
				.required('Select a date')
				.test('is-tomorrow-or-later', 'Date must be at least tomorrow', function (value) {
					if (!value) {
						return false;
					}
					const selectedDate = new Date(value);
					const today = new Date();

					// Reset time components to compare only dates
					selectedDate.setHours(0, 0, 0, 0);
					today.setHours(0, 0, 0, 0);

					// Calculate tomorrow's date
					const tomorrow = new Date(today);
					tomorrow.setDate(today.getDate() + 1);

					return selectedDate >= tomorrow;
				})
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
