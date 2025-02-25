import type { Component } from 'svelte';
import { ICampaign } from '$lib/types';

export interface ICampaignTimeLineProps {
	campaign: ICampaign | undefined;
	isOpen?: boolean;
	isCollapsable?: boolean;
	title?: string;
	isTimelineOpen?: boolean;
}

export declare const CampaignTimeLine: Component<ICampaignTimeLineProps>;
export default CampaignTimeLine;
