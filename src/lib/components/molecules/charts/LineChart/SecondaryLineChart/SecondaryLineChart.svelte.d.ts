import type { Component } from 'svelte';
import type { ChartInstance } from '$lib/types';

export interface ISecondaryLineChartProps {
	data: ChartInstance<'line'>['data'];
	lineColors: string[];
	backgroundColors: string[];
}

export declare const SecondaryLineChart: Component<ISecondaryLineChartProps>;
export default SecondaryLineChart;
