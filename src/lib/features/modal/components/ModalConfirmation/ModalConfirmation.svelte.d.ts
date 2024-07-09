import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		title?: string;
		description?: string;
		onConfirm?: () => void;
		onConfirmLabel?: string;
		onDeny?: () => void;
		onDenyLabel?: string;
		disabledDeny?: boolean;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IModalConfirmationProps_ = typeof __propDef.props;
export type { IModalConfirmationProps_ as IModalConfirmationProps };
export type IModalConfirmationEvents = typeof __propDef.events;
export type IModalConfirmationSlots = typeof __propDef.slots;

export default class ModalConfirmation extends SvelteComponent<
	IModalConfirmationProps,
	IModalConfirmationEvents,
	IModalConfirmationSlots
> {}
