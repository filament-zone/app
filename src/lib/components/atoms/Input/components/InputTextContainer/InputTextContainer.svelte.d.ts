import type { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		label: string;
		onClick: () => void;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};

type IInputTextContainerProps_ = typeof __propDef.props;

export type { IInputTextContainerProps_ as IInputTextContainerProps };
export type IInputTextContainerEvents = typeof __propDef.events;
export type IInputTextContainerSlots = typeof __propDef.slots;

export default class InputTextContainer extends SvelteComponent<
	IInputTextContainerProps,
	IInputTextContainerEvents,
	IInputTextContainerSlots
> {}
