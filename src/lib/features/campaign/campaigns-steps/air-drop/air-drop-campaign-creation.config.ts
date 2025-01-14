import {
	CampaignAirDropStep1,
	campaignAirDropStep1ValidationSchema,
	CampaignAirDropStep2,
	campaignAirDropStep2ValidationSchema,
	CampaignAirDropStep3,
	campaignAirDropStep3ValidationSchema,
	CampaignAirDropStep4
} from '$lib/features';

export const airDropCampaignCreationConfig = {
	steps: [CampaignAirDropStep1, CampaignAirDropStep2, CampaignAirDropStep3, CampaignAirDropStep4],
	validationsSchemas: [
		campaignAirDropStep1ValidationSchema,
		campaignAirDropStep2ValidationSchema,
		campaignAirDropStep3ValidationSchema
	]
};
