import { type ComponentType, SvelteComponent } from 'svelte';
import { EButtonSizeVariant, EButtonColorVariant } from '$lib/types';

declare const __propDef: {
	props: {
		sizeVariant?: EButtonSizeVariant;
		colorVariant?: EButtonColorVariant;
		LeftIcon?: ComponentType<SvelteComponent> | null;
		customStyles?: Record<string, unknown> | null;
		disabled?: boolean;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IButtonProps_ = typeof __propDef.props;
export type { IButtonProps_ as IButtonProps };
export type IButtonEvents = typeof __propDef.events;
export type IButtonSlots = typeof __propDef.slots;

export default class Button extends SvelteComponent<IButtonProps, IButtonEvents, IButtonSlots> {}
