import type { Component } from 'svelte';

export interface IAbstractDoughnutChartProps {
	chartData: ChartInstance<'doughnut'>['data'];
	chartInstance: ChartInstance<'doughnut'>;
	chartCanvasInstance: HTMLCanvasElement;
	chartOptions: ChartInstance<'doughnut'>['options'];
	plugins: Plugin<'doughnut'>[];
	classNames?: string;
}

export declare const AbstractDoughnutChart: Component<IAbstractDoughnutChartProps>;
export default AbstractDoughnutChart;
