import type { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		label?: string | null;
		error?: string;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};

type CustomProps = typeof __propDef.props;

type ITextAreaProps_ = CustomProps & Omit<Partial<HTMLTextAreaElement>, keyof CustomProps>;

export type { ITextAreaProps_ as ITextAreaProps };
export type ITextAreaEvents = typeof __propDef.events;
export type ITextAreaSlots = typeof __propDef.slots;

export default class TextArea extends SvelteComponent<
	ITextAreaProps,
	ITextAreaEvents,
	ITextAreaSlots
> {}
