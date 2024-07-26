import { SvelteComponent } from 'svelte';
import type { ChartInstance } from '$lib/types';

declare const __propDef: {
	props: {
		data: ChartInstance<'line'>['data'];
		styles?: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IPlainLineChartProps_ = typeof __propDef.props;
export type { IPlainLineChartProps_ as IPlainLineChartProps };
export type IPlainLineChartEvents = typeof __propDef.events;
export type IPlainLineChartSlots = typeof __propDef.slots;

export default class PlainLineChart extends SvelteComponent<
	IPlainLineChartProps,
	IPlainLineChartEvents,
	IPlainLineChartSlots
> {}
