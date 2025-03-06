import type { Component } from 'svelte';

export interface IAbstractPieChartProps {
	chartData: ChartInstance<'pie'>['data'];
	chartInstance: ChartInstance<'pie'>;
	chartCanvasInstance?: HTMLCanvasElement;
	plugins: Plugin<'pie'>[];
}

export declare const AbstractPieChart: Component<IAbstractPieChartProps>;
export default AbstractPieChart;
