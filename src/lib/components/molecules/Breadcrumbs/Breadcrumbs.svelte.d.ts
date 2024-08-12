import { SvelteComponent } from 'svelte';

export type TPathSegment = {
	segment: string;
	path: string;
};

declare const __propDef: {
	props: object;
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type IBreadcrumbsProps_ = typeof __propDef.props;
export type { IBreadcrumbsProps_ as IBreadcrumbsProps };
export type IBreadcrumbsEvents = typeof __propDef.events;
export type IBreadcrumbsSlots = typeof __propDef.slots;

export default class Breadcrumbs extends SvelteComponent<
	IBreadcrumbsProps,
	IBreadcrumbsEvents,
	IBreadcrumbsSlots
> {}
