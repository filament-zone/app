import type { Component } from 'svelte';

export interface IProgressBarProps {
	used: number;
	total: number;
	displayLabel?: boolean;
	styles?: string;
}

export declare const ProgressBar: Component<IProgressBarProps>;
export default ProgressBar;
