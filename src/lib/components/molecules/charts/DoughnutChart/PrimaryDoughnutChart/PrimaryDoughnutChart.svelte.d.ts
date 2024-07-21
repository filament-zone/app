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
type IPrimaryDoughnutChartProps_ = typeof __propDef.props;
export type { IPrimaryDoughnutChartProps_ as IPrimaryDoughnutChartProps };
export type IPrimaryDoughnutChartEvents = typeof __propDef.events;
export type IPrimaryDoughnutChartSlots = typeof __propDef.slots;

export default class PrimaryDoughnutChart extends SvelteComponent<
	IPrimaryDoughnutChartProps,
	IPrimaryDoughnutChartEvents,
	IPrimaryDoughnutChartSlots
> {}
