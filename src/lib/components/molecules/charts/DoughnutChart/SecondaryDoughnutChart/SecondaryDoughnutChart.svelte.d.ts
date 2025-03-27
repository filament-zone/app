import type { Component } from 'svelte';
import type { ChartInstance } from '$lib/types';

export interface ISecondaryDoughnutChartProps {
	chartData: ChartInstance<'doughnut'>['data'];
	colors?: string[];
	chartInstance?: ChartInstance<'Doughnut'>;
	centerText?: string[];
	classNames?: string;
}

export declare const SecondaryDoughnutChart: Component<ISecondaryDoughnutChartProps>;
export default SecondaryDoughnutChart;
