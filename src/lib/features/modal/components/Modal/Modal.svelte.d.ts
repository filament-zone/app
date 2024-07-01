import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		closeOnClickOutside?: boolean;
		classNames?: string;
		width?: string;
		onClickOutside?: () => void;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: {
		header: object;
		content: object;
	};
};
type IModalProps_ = typeof __propDef.props;
export type { IModalProps_ as IModalProps };
export type IModalEvents = typeof __propDef.events;
export type IModalSlots = typeof __propDef.slots;

export default class Modal extends SvelteComponent<IModalProps, IModalEvents, IModalSlots> {}
