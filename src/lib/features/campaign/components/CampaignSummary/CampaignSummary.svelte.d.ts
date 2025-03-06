import type { Component } from 'svelte';
import { ICampaign } from '$lib/types';

export interface ICampaignSummaryProps {
	campaign: ICampaign;
	withTimeLine?: boolean;
}

export declare const CampaignSummary: Component<ICampaignSummaryProps>;
export default CampaignSummary;
