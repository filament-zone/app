import { SvelteComponent } from 'svelte';

export type TToggleContentContainerSelected = 'isFirst' | 'isSecond';

declare const __propDef: {
	props: {
		selected: TToggleContentContainerSelected;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: {
		first: object;
		second: object;
	};
};
type IToggleContentContainerProps_ = typeof __propDef.props;
export type { IToggleContentContainerProps_ as IToggleContentContainerProps };
export type IToggleContentContainerEvents = typeof __propDef.events;
export type IToggleContentContainerSlots = typeof __propDef.slots;

export default class ToggleContentContainer extends SvelteComponent<
	IToggleContentContainerProps,
	IToggleContentContainerEvents,
	IToggleContentContainerSlots
> {}
