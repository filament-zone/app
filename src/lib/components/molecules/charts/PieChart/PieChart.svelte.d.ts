import { SvelteComponent } from 'svelte';
import type { Chart } from 'chart.js';

declare const __propDef: {
	props: {
		data: { label: string; value: number }[];
		colors?: string[];
		chartInstance?: Chart<'pie', number[] | undefined, string>;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IPieChartProps_ = typeof __propDef.props;
export type { IPieChartProps_ as IPieChartProps };
export type IPieChartEvents = typeof __propDef.events;
export type IPieChartSlots = typeof __propDef.slots;

export default class PieChart extends SvelteComponent<
	IPieChartProps,
	IPieChartEvents,
	IPieChartSlots
> {}
