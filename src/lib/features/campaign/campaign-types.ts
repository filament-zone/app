import { ECampaignType } from '$lib/api/campaign/campaign.hub.api.enums';

export const campaignTypes = Object.values(ECampaignType).map((type) => type);
