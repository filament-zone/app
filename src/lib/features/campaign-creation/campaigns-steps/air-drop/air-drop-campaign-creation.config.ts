import {
	CampaignAirDropStep1,
	CampaignAirDropStep2,
	CampaignAirDropStep3,
	CampaignAirDropStep4,
	campaignAirDropStep1ValidationSchema,
	campaignAirDropStep2ValidationSchema,
	campaignAirDropStep3ValidationSchema
} from '$lib/features';

export const airDropCampaignCreationConfig = {
	steps: [CampaignAirDropStep1, CampaignAirDropStep2, CampaignAirDropStep3, CampaignAirDropStep4],
	validationsSchemas: [
		campaignAirDropStep1ValidationSchema,
		campaignAirDropStep2ValidationSchema,
		campaignAirDropStep3ValidationSchema
	]
};
