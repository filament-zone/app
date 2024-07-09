import type { SvelteComponent } from 'svelte';
import type { IToastConfig } from '$lib/types';

declare const __propDef: {
	props: {
		config?: IToastConfig;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IToastProps_ = typeof __propDef.props;
export type { IToastProps_ as IToastProps };
export type IToastEvents = typeof __propDef.events;
export type IToastSlots = typeof __propDef.slots;

export default class IToast extends SvelteComponent<IToastProps, IToastEvents, IToastSlots> {}
