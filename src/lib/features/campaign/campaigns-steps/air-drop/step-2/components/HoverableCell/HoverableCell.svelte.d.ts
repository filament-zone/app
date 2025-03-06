import { type Component } from 'svelte';

export interface IHoverableCellProps {
	id: string;
	isCompleted: boolean;
	isSettingsCircleGreen: boolean;
}

export declare const HoverableCell: Component<IHoverableCellProps>;
export default HoverableCell;
