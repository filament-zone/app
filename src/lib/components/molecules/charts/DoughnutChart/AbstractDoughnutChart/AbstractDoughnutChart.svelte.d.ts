import { SvelteComponent } from 'svelte';
import type { ChartInstance } from '$lib/types';

declare const __propDef: {
	props: {
		chartData: ChartInstance<'doughnut'>['data'];
		chartInstance: ChartInstance<'doughnut'>;
		chartCanvasInstance: HTMLCanvasElement;
		chartOptions: ChartInstance<'doughnut'>['options'];
		plugins: Plugin<'doughnut'>[];
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IAbstractDoughnutChartProps_ = typeof __propDef.props;
export type { IAbstractDoughnutChartProps_ as IAbstractDoughnutChartProps };
export type IAbstractDoughnutChartEvents = typeof __propDef.events;
export type IAbstractDoughnutChartSlots = typeof __propDef.slots;

export default class AbstractDoughnutChart extends SvelteComponent<
	IAbstractDoughnutChartProps,
	IAbstractDoughnutChartEvents,
	IAbstractDoughnutChartSlots
> {}
