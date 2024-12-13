import { redirect } from '@sveltejs/kit';
import { campaignTypes } from '$lib/features';
import { routes } from '$lib/constants';
import type { LayoutServerLoad } from './$types';
import { type TStepBarConfig } from '$lib/types';
import { ECampaignType } from '$lib/api/hub/campaign/campaign.hub.api.enums';

export const load: LayoutServerLoad = async ({ params }) => {
	const initSteps: TStepBarConfig = {
		[ECampaignType.AIR_DROP]: {
			label: 'AirDrop',
			steps: [
				{ value: 1, label: '1', description: 'Setup', isActive: true, isCompleted: false },
				{
					value: 2,
					label: '2',
					description: 'Eligibility',
					isActive: false,
					isCompleted: false
				},
				{ value: 3, label: '3', description: 'Budget', isActive: false, isCompleted: false },
				{ value: 4, label: '4', description: 'Summary', isActive: false, isCompleted: false }
			]
		}
	};

	const selectedCampaignType = params.campaignType as ECampaignType;

	if (!campaignTypes.includes(selectedCampaignType)) {
		redirect(301, routes.CAMPAIGNS.MANAGE.ROOT);
	}

	return {
		layoutData: {
			selectedCampaignType,
			initSteps: initSteps[selectedCampaignType].steps,
			label: initSteps[selectedCampaignType].label
		}
	};
};
