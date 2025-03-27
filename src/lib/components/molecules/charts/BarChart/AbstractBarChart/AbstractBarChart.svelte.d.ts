import type { Component } from 'svelte';
import type { ChartInstance } from '$lib/types';

export interface IAbstractBarChartProps {
	chartInstance?: ChartInstance;
	chartCanvasInstance?: HTMLCanvasElement;
	chartData: ChartInstance['data'];
	chartOptions: IAbstractBarChartProps['chartInstance']['options'];
	plugins?: Plugin<'bar'>[];
	classNames?: string;
	rightSliderBarIndex?: number;
	leftSliderBarIndex?: number;
	styles?: string;
}

export declare const AbstractBarChart: Component<IAbstractBarChartProps>;
export default AbstractBarChart;
