import { SvelteComponent } from 'svelte';
import { ETxTimeLineItem } from '$lib/types';

declare const __propDef: {
	props: {
		iconStatus?: ETxTimeLineItem;
		title: string;
		description: string;
		date?: string | Date;
		status?: string;
		isLast?: boolean;
		isFirst?: boolean;
		onButtonClick?: (() => Promise<void> | void) | null;
		buttonLabel?: string | null;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ITxTimeLineItemProps_ = typeof __propDef.props;
export type { ITxTimeLineItemProps_ as ITxTimeLineItemProps };
export type ITxTimeLineItemEvents = typeof __propDef.events;
export type ITxTimeLineItemSlots = typeof __propDef.slots;

export default class TxTimeLineItem extends SvelteComponent<
	ITxTimeLineItemProps,
	ITxTimeLineItemEvents,
	ITxTimeLineItemSlots
> {}
