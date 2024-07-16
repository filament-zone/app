import { SvelteComponent } from 'svelte';
import type { ChartInstance } from '$lib/types';

declare const __propDef: {
	props: {
		chartInstance?: ChartInstance<'line'>;
		chartCanvasInstance: HTMLCanvasElement;
		data: ChartInstance<'line'>['data'];
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ILineChartProps_ = typeof __propDef.props;
export type { ILineChartProps_ as ILineChartProps };
export type ILineChartEvents = typeof __propDef.events;
export type ILineChartSlots = typeof __propDef.slots;

export default class LineChart extends SvelteComponent<
	ILineChartProps,
	ILineChartEvents,
	ILineChartSlots
> {}
