import { SvelteComponent } from 'svelte';
import type { ChartInstance } from '$lib/types';

declare const __propDef: {
	props: {
		data: { label: string; value: number }[];
		colors?: string[];
		chartInstance?: ChartInstance<'pie'>;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IPrimaryPieChartProps_ = typeof __propDef.props;
export type { IPrimaryPieChartProps_ as IPrimaryPieChartProps };
export type IPrimaryPieChartEvents = typeof __propDef.events;
export type IPrimaryPieChartSlots = typeof __propDef.slots;

export default class PrimaryPieChart extends SvelteComponent<
	IPrimaryPieChartProps,
	IPrimaryPieChartEvents,
	IPrimaryPieChartSlots
> {}
