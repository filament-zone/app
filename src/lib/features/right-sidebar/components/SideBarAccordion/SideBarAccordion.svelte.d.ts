import { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: { label: string };
	events: {
		[evt: string]: CustomEvent<unknown>;
	};
	slots: object;
};
type ISideBarAccordionProps_ = typeof __propDef.props;
export type { ISideBarAccordionProps_ as ISideBarAccordionProps };
export type ISideBarAccordionEvents = typeof __propDef.events;
export type ISideBarAccordionSlots = typeof __propDef.slots;

export default class SideBarAccordion extends SvelteComponent<
	ISideBarAccordionProps,
	ISideBarAccordionEvents,
	ISideBarAccordionSlots
> {}
