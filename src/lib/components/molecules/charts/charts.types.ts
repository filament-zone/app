import { Chart, type ChartType } from 'chart.js';

export type ChartInstance<TType extends ChartType = ChartType> = Chart<
	TType,
	(number | number[])[],
	string
>;
