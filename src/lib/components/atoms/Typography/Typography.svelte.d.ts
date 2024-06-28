import { SvelteComponent } from 'svelte';

export type TTypographyVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'subtitle1'
	| 'subtitle2'
	| 'body1'
	| 'body2'
	| 'button'
	| 'caption'
	| 'overline';

declare const __propDef: {
	props: {
		variant: TTypographyVariant;
		color?: string;
		styles?: string;
		className?: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};
type ITypographyProps_ = typeof __propDef.props;
export type { ITypographyProps_ as ITypographyProps };
export type ITypographyEvents = typeof __propDef.events;
export type ITypographySlots = typeof __propDef.slots;

export default class Typography extends SvelteComponent<
	ITypographyProps,
	ITypographyEvents,
	ITypographySlots
> {}
