import { Chart, type ChartType } from 'chart.js';

export type ChartInstance<TType extends ChartType = ChartType> = Chart<
	TType,
	(number | number[])[],
	string
>;

export enum EChartDateRange {
	'1d' = '1d',
	'1w' = '1w',
	'1m' = '1m',
	'3m' = '3m',
	'6m' = '6m',
	'1y' = '1y',
	'5y' = '5y',
	'all' = 'all'
}
