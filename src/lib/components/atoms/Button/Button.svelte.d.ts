import { type ComponentType, SvelteComponent } from 'svelte';
import { EButtonSizeVariant, EButtonVariant } from '$lib/types';

declare const __propDef: {
	props: {
		sizeVariant?: EButtonSizeVariant;
		styleVariant?: EButtonVariant;
		LeftIcon?: ComponentType<SvelteComponent> | null;
		customStyles?: Record<string, unknown> | null;
		disabled?: boolean;
	};
	events: {
		[evt: string]: CustomEvent<unknown>;
	};
	slots: object;
};
type IButtonProps_ = typeof __propDef.props;
export type { IButtonProps_ as IButtonProps };
export type IButtonEvents = typeof __propDef.events;
export type IButtonSlots = typeof __propDef.slots;

export default class Button extends SvelteComponent<IButtonProps, IButtonEvents, IButtonSlots> {}
