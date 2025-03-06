import type { Component } from 'svelte';

export interface ITxTimeLineItemProps {
	iconStatus?: ETxTimeLineItem;
	title: string;
	description: string;
	date?: string | Date;
	status?: string;
	isLast?: boolean;
	isFirst?: boolean;
	onButtonClick?: (() => Promise<void> | void) | null;
	buttonLabel?: string | null;
}

export declare const TxTimeLineItem: Component<ITxTimeLineItemProps>;
export default TxTimeLineItem;
