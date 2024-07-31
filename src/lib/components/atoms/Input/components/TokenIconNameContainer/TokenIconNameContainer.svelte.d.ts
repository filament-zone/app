import { type ComponentType, SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		tokenIcon: ComponentType<SvelteComponent>;
		tokenTicker: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ITokenIconNameContainerProps_ = typeof __propDef.props;
export type { ITokenIconNameContainerProps_ as ITokenIconNameContainerProps };
export type ITokenIconNameContainerEvents = typeof __propDef.events;
export type ITokenIconNameContainerSlots = typeof __propDef.slots;

export default class TokenIconNameContainer extends SvelteComponent<
	ITokenIconNameContainerProps,
	ITokenIconNameContainerEvents,
	ITokenIconNameContainerSlots
> {}
