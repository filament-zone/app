import {
	campaignAirDropStep1ValidationSchema,
	campaignAirDropStep2ValidationSchema,
	campaignAirDropStep3ValidationSchema
} from '$lib/features';

import CampaignAirDropStep1 from '$lib/features/campaign-creation/campaigns-steps/air-drop/step-1/CampaignAirDropStep1.svelte';
import CampaignAirDropStep2 from '$lib/features/campaign-creation/campaigns-steps/air-drop/step-2/CampaignAirDropStep2.svelte';
import CampaignAirDropStep3 from '$lib/features/campaign-creation/campaigns-steps/air-drop/step-3/CampaignAirDropStep3.svelte';
import CampaignAirDropStep4 from '$lib/features/campaign-creation/campaigns-steps/air-drop/step-4/CampaignAirDropStep4.svelte';

export const airDropCampaignCreationConfig = {
	steps: [CampaignAirDropStep1, CampaignAirDropStep2, CampaignAirDropStep3, CampaignAirDropStep4],
	validationsSchemas: [
		campaignAirDropStep1ValidationSchema,
		campaignAirDropStep2ValidationSchema,
		campaignAirDropStep3ValidationSchema
	]
};
