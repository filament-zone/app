import { SvelteComponent } from 'svelte';
import type { ChartInstance } from '$lib/types';

declare const __propDef: {
	props: {
		chartInstance: ChartInstance<'bar'>;
		chartCanvasInstance: HTMLCanvasElement;
		chartData: ChartInstance<'bar'>['data'];
		plugins: Plugin<'bar'>[];
		className?: string;
		rightSliderBarIndex?: number;
		leftSliderBarIndex?: number;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IAbstractBarChartProps_ = typeof __propDef.props;
export type { IAbstractBarChartProps_ as IAbstractBarChartProps };
export type IAbstractBarChartEvents = typeof __propDef.events;
export type IAbstractBarChartSlots = typeof __propDef.slots;

export default class AbstractBarChart extends SvelteComponent<
	IAbstractBarChartProps,
	IAbstractBarChartEvents,
	IAbstractBarChartSlots
> {}
