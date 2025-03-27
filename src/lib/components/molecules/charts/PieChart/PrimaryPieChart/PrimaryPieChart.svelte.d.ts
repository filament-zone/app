import type { Component } from 'svelte';

export interface IPrimaryPieChartProps {
	data: { label: string; value: number }[];
	colors?: string[];
	chartInstance?: ChartInstance<'pie'>;
	chartCanvasInstance?: HTMLCanvasElement;
}

export declare const PrimaryPieChart: Component<IPrimaryPieChartProps>;
export default PrimaryPieChart;
