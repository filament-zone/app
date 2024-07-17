import { SvelteComponent } from 'svelte';
import type { ChartInstance } from '$lib/types';

declare const __propDef: {
	props: {
		data: ChartInstance['data'];
		onChange: (left: string, right: string) => void;
		minLabel?: string;
		maxLabel?: string;
		displayOnlySlider?: boolean;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ISliderBarChartProps_ = typeof __propDef.props;
export type { ISliderBarChartProps_ as ISliderBarChartProps };
export type ISliderBarChartEvents = typeof __propDef.events;
export type ISliderBarChartSlots = typeof __propDef.slots;

export default class SliderBarChart extends SvelteComponent<
	ISliderBarChartProps,
	ISliderBarChartEvents,
	ISliderBarChartSlots
> {}
