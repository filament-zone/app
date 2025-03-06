import type { Component } from 'svelte';

export interface ITrendDisplayProps {
	value: number | string;
	change: string;
	period: string;
	direction: string;
}

export declare const TrendDisplay: Component<ITrendDisplayProps>;
export default TrendDisplay;
