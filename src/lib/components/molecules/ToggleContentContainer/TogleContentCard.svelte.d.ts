import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: {
		label: object;
		content: object;
	};
};
type IToggleContentCardProps_ = typeof __propDef.props;
export type { IToggleContentCardProps_ as IToggleContentCardProps };
export type IToggleContentCardEvents = typeof __propDef.events;
export type IToggleContentCardSlots = typeof __propDef.slots;

export default class ToggleContentCard extends SvelteComponent<
	IToggleContentCardProps,
	IToggleContentCardEvents,
	IToggleContentCardSlots
> {}
