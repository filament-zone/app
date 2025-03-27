import { type Component } from 'svelte';
import { type formatLargeNumber } from '$lib/utils';
import {
	EChartDateRange,
	ISecondaryLineChartProps,
	IToggleProps,
	ITrendDisplayProps
} from '$lib/types';

export interface ILineChartWithControlsProps {
	chartData: ISecondaryLineChartProps['data'];
	label?: string;
	trendDisplayData?: ITrendDisplayProps;
	toggleOptions?: EChartDateRange[];
	toggleValue?: IToggleProps<string>['value'];
	formatter?: typeof formatLargeNumber;
	useLastValue?: boolean;
	displayToggle?: boolean;
}

export declare const LineChartWithControls: Component<ILineChartWithControlsProps>;
export default LineChartWithControls;
