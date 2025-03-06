import type { Component } from 'svelte';
import type { ChartInstance } from '$lib/types';

export interface IPlainLineChartProps {
	data: ChartInstance<'line'>['data'];
	styles?: string;
}

export declare const PlainLineChart: Component<IPlainLineChartProps>;
export default PlainLineChart;
