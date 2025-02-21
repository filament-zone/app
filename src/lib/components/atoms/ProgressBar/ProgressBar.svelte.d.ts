import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		used: number;
		total: number;
		displayLabel?: boolean;
		styles?: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IProgressBarProps_ = typeof __propDef.props;
export type { IProgressBarProps_ as IProgressBarProps };
export type IProgressBarEvents = typeof __propDef.events;
export type IProgressBarSlots = typeof __propDef.slots;

export default class ProgressBar extends SvelteComponent<
	IProgressBarProps,
	IProgressBarEvents,
	IProgressBarSlots
> {}
