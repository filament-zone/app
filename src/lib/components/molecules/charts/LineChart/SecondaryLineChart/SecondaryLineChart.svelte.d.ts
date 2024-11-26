import { SvelteComponent } from 'svelte';
import type { ChartInstance } from '$lib/types';

declare const __propDef: {
	props: {
		data: ChartInstance<'line'>['data'];
		lineColors: string[];
		backgroundColors: string[];
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ISecondaryLineChartProps_ = typeof __propDef.props;
export type { ISecondaryLineChartProps_ as ISecondaryLineChartProps };
export type ISecondaryLineChartEvents = typeof __propDef.events;
export type ISecondaryLineChartSlots = typeof __propDef.slots;

export default class SecondaryLineChart extends SvelteComponent<
	ISecondaryLineChartProps,
	ISecondaryLineChartEvents,
	ISecondaryLineChartSlots
> {}
