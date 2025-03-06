import type { Component } from 'svelte';

export interface IAbstractLineChartProps {
	chartInstance: ChartInstance;
	chartCanvasInstance?: HTMLCanvasElement;
	chartData: ChartInstance<'line'>['data'];
	plugins?: Plugin<'line'>[];
	className?: string;
	rightSliderBarIndex?: number;
	leftSliderBarIndex?: number;
	chartOptions?: ChartInstance['options'];
	styles?: string;
}

export declare const AbstractLineChart: Component<IAbstractLineChartProps>;
export default AbstractLineChart;
