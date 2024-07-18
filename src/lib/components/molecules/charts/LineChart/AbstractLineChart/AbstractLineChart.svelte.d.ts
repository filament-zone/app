import { SvelteComponent } from 'svelte';
import type { ChartInstance } from '$lib/types';

declare const __propDef: {
	props: {
		chartInstance: ChartInstance<'line'>;
		chartCanvasInstance: HTMLCanvasElement;
		chartData: ChartInstance<'line'>['data'];
		plugins: Plugin<'line'>[];
		className?: string;
		rightSliderBarIndex?: number;
		leftSliderBarIndex?: number;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IAbstractLineChartProps_ = typeof __propDef.props;
export type { IAbstractLineChartProps_ as IAbstractLineChartProps };
export type IAbstractLineChartEvents = typeof __propDef.events;
export type IAbstractLineChartSlots = typeof __propDef.slots;

export default class AbstractLineChart extends SvelteComponent<
	IAbstractLineChartProps,
	IAbstractLineChartEvents,
	IAbstractLineChartSlots
> {}
