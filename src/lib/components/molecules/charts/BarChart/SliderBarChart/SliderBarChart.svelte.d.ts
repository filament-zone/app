import { type Component } from 'svelte';

export interface ISliderBarChartProps {
	data: ChartInstance['data'];
	onChange: (left: string, right: string) => void;
	minLabel?: string;
	maxLabel?: string;
	displayOnlySlider?: boolean;
	classNames?: string;
}

export declare const SliderBarChart: Component<ISliderBarChartProps>;
export default SliderBarChart;
