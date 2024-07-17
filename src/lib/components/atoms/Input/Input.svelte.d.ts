import type { SvelteComponent, ComponentType } from 'svelte';
import { EInputColorVariant, type EInputSizeVariant } from '$lib/types';

declare const __propDef: {
	props: {
		label?: string | null;
		error?: string;
		sizeVariant?: EInputSizeVariant;
		readonly?: boolean;
		RightIcon?: ComponentType<SvelteComponent> | string | null;
		leftLabel?: string | null;
		LeftIcon?: ComponentType<SvelteComponent> | string | null;
		colorVariant?: EInputColorVariant;
		onInput?: (e: Event) => void;
		hideLeftBorder?: boolean;
		inputClassNames?: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};

type CustomProps = typeof __propDef.props;

type IInputProps_ = CustomProps & Omit<HTMLInputElement, keyof CustomProps>;

export type { IInputProps_ as IInputProps };
export type IInputEvents = typeof __propDef.events;
export type IInputSlots = typeof __propDef.slots;

export default class Input extends SvelteComponent<IInputProps, IInputEvents, IInputSlots> {}
