import { SvelteComponent } from 'svelte';
import type { ChartInstance } from '$lib/types';

declare const __propDef: {
	props: {
		chartData: ChartInstance<'pie'>['data'];
		chartInstance: ChartInstance<'pie'>;
		chartCanvasInstance: HTMLCanvasElement;
		plugins: Plugin<'pie'>[];
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IAbstractPieChartProps_ = typeof __propDef.props;
export type { IAbstractPieChartProps_ as IAbstractPieChartProps };
export type IAbstractPieChartEvents = typeof __propDef.events;
export type IAbstractPieChartSlots = typeof __propDef.slots;

export default class AbstractPieChart extends SvelteComponent<
	IAbstractPieChartProps,
	IAbstractPieChartEvents,
	IAbstractPieChartSlots
> {}
