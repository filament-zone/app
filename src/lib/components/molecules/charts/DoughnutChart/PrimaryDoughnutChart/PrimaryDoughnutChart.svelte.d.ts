import type { Component } from 'svelte';
import type { ChartInstance } from '$lib/types';

export interface IPrimaryDoughnutChartProps {
	chartData: ChartInstance<'doughnut'>['data'] | null;
}

export declare const PrimaryDoughnutChart: Component<IPrimaryDoughnutChartProps>;
export default PrimaryDoughnutChart;
