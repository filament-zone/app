import type { Component } from 'svelte';
import { ECampaignPhase } from '$lib/types';

export interface ICampaignTimeLineItemProps {
	title: string;
	description: string;
	date?: string | Date;
	status?: string;
	isLast?: boolean;
	isFirst?: boolean;
	onButtonClick?: (() => Promise<void> | void) | null;
	buttonLabel?: string | null;
	phase?: ECampaignPhase;
	numericPhase?: number;
	isExpanded?: boolean;
}

export declare const CampaignTimeLineItem: Component<ICampaignTimeLineItemProps>;
export default CampaignTimeLineItem;
