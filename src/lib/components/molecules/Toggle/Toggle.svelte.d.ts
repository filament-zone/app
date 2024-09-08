import type { SvelteComponent } from 'svelte';

export interface IToggleOption<T> {
	value: T;
	label: string;
	disabled?: boolean;
}

declare const __propDef: {
	props: {
		options?: IToggleOption<T>[] | null;
		value?: T | T[] | null;
		onChange?: ((value: T | T[]) => void) | null;
		label?: string;
		isMulti?: boolean;
		variant?: EToggleVariant;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IToggleProps_<T = string> = typeof __propDef.props<T>;
export type { IToggleProps_ as IToggleProps };
export type IToggleEvents = typeof __propDef.events;
export type IToggleSlots = typeof __propDef.slots;

export default class Toggle extends SvelteComponent<IToggleProps<T>, IToggleEvents, IToggleSlots> {}
