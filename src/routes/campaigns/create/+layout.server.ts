import type { LayoutServerLoad } from './$types';
import { ECampaignType, type TStepBarConfig } from '$lib/types';

export const load: LayoutServerLoad = async ({ url }) => {
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
				{ value: 4, label: '4', description: 'Summary', isActive: false, isCompleted: false },
				{ value: 5, label: '5', description: null, isActive: false, isCompleted: false }
			]
		}
	};

	const selectedCampaignType = url.pathname.split('/').at(-1) as ECampaignType;

	return {
		initSteps: initSteps[selectedCampaignType].steps,
		label: initSteps[selectedCampaignType].label
	};
};
