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
type IPrimaryLineChartProps_ = typeof __propDef.props;
export type { IPrimaryLineChartProps_ as IPrimaryLineChartProps };
export type IPrimaryLineChartEvents = typeof __propDef.events;
export type IPrimaryLineChartSlots = typeof __propDef.slots;

export default class PrimaryLineChart extends SvelteComponent<
	IPrimaryLineChartProps,
	IPrimaryLineChartEvents,
	IPrimaryLineChartSlots
> {}
