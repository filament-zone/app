import { SvelteComponent } from 'svelte';
import {
	EChartDateRange,
	ISecondaryLineChartProps,
	IToggleProps,
	ITrendDisplayProps
} from '$lib/types';
import { type formatLargeNumber } from '$lib/utils';

declare const __propDef: {
	props: {
		data: ISecondaryLineChartProps['data'];
		label: string;
		trendDisplayData: ITrendDisplayProps;
		toggleOptions: EChartDateRange[];
		toggleValue: IToggleProps<string>['value'];
		formatter?: typeof formatLargeNumber;
		useLastValue?: boolean;
		displayToggle?: boolean;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ILineChartWithControlsProps_ = typeof __propDef.props;
export type { ILineChartWithControlsProps_ as ILineChartWithControlsProps };
export type ILineChartWithControlsEvents = typeof __propDef.events;
export type ILineChartWithControlsSlots = typeof __propDef.slots;

export default class LineChartWithControls extends SvelteComponent<
	ILineChartWithControlsProps,
	ILineChartWithControlsEvents,
	ILineChartWithControlsSlots
> {}
