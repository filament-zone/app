import { type ComponentType, SvelteComponent } from 'svelte';
import { EButtonSizeVariant, EButtonStyleVariant } from '$lib/types';

declare const __propDef: {
	props: {
		sizeVariant?: EButtonSizeVariant;
		styleVariant?: EButtonStyleVariant;
		LeftContent?: ComponentType<SvelteComponent> | null;
	};
	events: {
		[evt: string]: CustomEvent<unknown>;
	};
	slots: object;
};

type CustomProps = typeof __propDef.props;

type IButtonProps_ = CustomProps & Omit<Partial<HTMLButtonElement>, keyof CustomProps>;

export type { IButtonProps_ as IButtonProps };
export type IButtonEvents = typeof __propDef.events;
export type IButtonSlots = typeof __propDef.slots;

export default class Button extends SvelteComponent<IButtonProps, IButtonEvents, IButtonSlots> {}
