import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IModalTransactionTimeLineProps_ = typeof __propDef.props;
export type { IModalTransactionTimeLineProps_ as IModalTransactionTimeLineProps };
export type IModalTransactionTimeLineEvents = typeof __propDef.events;
export type IModalTransactionTimeLineSlots = typeof __propDef.slots;

export default class ModalTransactionTimeLine extends SvelteComponent<
	IModalTransactionTimeLineProps,
	IModalTransactionTimeLineEvents,
	IModalTransactionTimeLineSlots
> {}
