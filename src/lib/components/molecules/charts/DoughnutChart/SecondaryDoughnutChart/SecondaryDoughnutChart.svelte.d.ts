import { SvelteComponent } from 'svelte';
import type { ChartInstance } from '$lib/types';

declare const __propDef: {
	props: {
		chartData: ChartInstance<'doughnut'>['data'];
		colors?: string[];
		chartInstance?: ChartInstance<'Doughnut'>;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ISecondaryDoughnutChartProps_ = typeof __propDef.props;
export type { ISecondaryDoughnutChartProps_ as ISecondaryDoughnutChartProps };
export type ISecondaryDoughnutChartEvents = typeof __propDef.events;
export type ISecondaryDoughnutChartSlots = typeof __propDef.slots;

export default class SecondaryDoughnutChart extends SvelteComponent<
	ISecondaryDoughnutChartProps,
	ISecondaryDoughnutChartEvents,
	ISecondaryDoughnutChartSlots
> {}
