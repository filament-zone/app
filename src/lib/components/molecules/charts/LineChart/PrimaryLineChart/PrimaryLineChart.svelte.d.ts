import type { Component } from 'svelte';
import type { ChartInstance } from '$lib/types';

export interface IPrimaryLineChartProps {
	data: ChartInstance<'line'>['data'];
}

export declare const PrimaryLineChart: Component<IPrimaryLineChartProps>;
export default PrimaryLineChart;
