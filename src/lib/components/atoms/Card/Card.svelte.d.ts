import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		label: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ICardProps_ = typeof __propDef.props;
export type { ICardProps_ as ICardProps };
export type ICardEvents = typeof __propDef.events;
export type ICardSlots = typeof __propDef.slots;

export default class Card extends SvelteComponent<ICardProps, ICardEvents, ICardSlots> {}
