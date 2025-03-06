import type { Component } from 'svelte';
import { type IButtonProps, type ISearchSelectProps } from '$lib/types';

export interface ILiveProposalsTableLabelComponentProps {
	searchSelectProps?: ISearchSelectProps;
	buttonProps?: Partial<IButtonProps>;
}

export declare const LiveProposalsTableLabelComponent: Component<ILiveProposalsTableLabelComponentProps>;
export default LiveProposalsTableLabelComponent;
