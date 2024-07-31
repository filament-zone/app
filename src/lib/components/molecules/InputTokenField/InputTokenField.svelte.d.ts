import { SvelteComponent } from 'svelte';
import { IInputProps, ITokenIconNameContainerProps } from '$lib/types';

declare const __propDef: {
	props: {
		onChange?: IInputProps['onInput'];
		onMaxClick?: () => void;
		inputProps?: IInputProps;
		tokenProps: ITokenIconNameContainerProps;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IInputTokenFieldProps_ = typeof __propDef.props;
export type { IInputTokenFieldProps_ as IInputTokenFieldProps };
export type IInputTokenFieldEvents = typeof __propDef.events;
export type IInputTokenFieldSlots = typeof __propDef.slots;

export default class InputTokenField extends SvelteComponent<
	IInputTokenFieldProps,
	IInputTokenFieldEvents,
	IInputTokenFieldSlots
> {}
