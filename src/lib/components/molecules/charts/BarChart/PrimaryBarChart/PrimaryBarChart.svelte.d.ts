import { SvelteComponent } from 'svelte';
import type { ChartInstance } from '$lib/components/molecules/charts/charts.types';

declare const __propDef: {
	props: {
		data: ChartInstance['data'];
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IPrimaryBarChartProps_ = typeof __propDef.props;
export type { IPrimaryBarChartProps_ as IPrimaryBarChartProps };
export type IPrimaryBarChartEvents = typeof __propDef.events;
export type IPrimaryBarChartSlots = typeof __propDef.slots;

export default class PrimaryBarChart extends SvelteComponent<
	IPrimaryBarChartProps,
	IPrimaryBarChartEvents,
	IPrimaryBarChartSlots
> {}

export type ScreenConfigT = {
	chartHeight: number;
	max: number;
	x: {
		fontSize: number;
	};
	x2: {
		fontSize: number;
	};
};
