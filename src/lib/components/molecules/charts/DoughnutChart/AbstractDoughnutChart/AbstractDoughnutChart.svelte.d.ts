import type { Component } from 'svelte';

export interface IAbstractDoughnutChartProps {
	chartData: ChartInstance['data'];
	chartInstance?: ChartInstance;
	chartCanvasInstance?: HTMLCanvasElement;
	chartOptions: ChartInstance['options'];
	plugins: Plugin<'doughnut'>[];
	classNames?: string;
}

export declare const AbstractDoughnutChart: Component<IAbstractDoughnutChartProps>;
export default AbstractDoughnutChart;
