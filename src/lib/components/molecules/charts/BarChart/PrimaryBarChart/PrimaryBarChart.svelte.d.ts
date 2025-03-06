export type ScreenConfigT = {
	chartHeight: number;
	max: number;
	x: {
		fontSize: number;
	};
	x2: {
		fontSize: number;
	};
};

import type { Component } from 'svelte';
import { ChartInstance } from 'chart.js';

export interface IPrimaryBarChartProps {
	data: ChartInstance['data'];
}

export declare const PrimaryBarChart: Component<IPrimaryBarChartProps>;
export default PrimaryBarChart;
