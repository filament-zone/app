import { SvelteComponent } from 'svelte';
import { type ISearchSelectProps } from '$lib/types';

declare const __propDef: {
	props: {
		searchSelectProps: ISearchSelectProps;
		buttonProps: {
			onClick: () => void;
		};
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ILiveProposalsTableLabelComponentProps_ = typeof __propDef.props;
export type { ILiveProposalsTableLabelComponentProps_ as ILiveProposalsTableLabelComponentProps };
export type ILiveProposalsTableLabelComponentEvents = typeof __propDef.events;
export type ILiveProposalsTableLabelComponentSlots = typeof __propDef.slots;

export default class LiveProposalsTableLabelComponent extends SvelteComponent<
	ILiveProposalsTableLabelComponentProps,
	ILiveProposalsTableLabelComponentEvents,
	ILiveProposalsTableLabelComponentSlots
> {}
