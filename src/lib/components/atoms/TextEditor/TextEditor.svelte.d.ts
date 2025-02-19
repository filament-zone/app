import type { SvelteComponent } from 'svelte';

declare const __propDef: {
	props: {
		value?: string | null;
	};
	events: {
		[evt: string]: CustomEvent;
	};
	slots: object;
};

export type ITextEditorProps = typeof __propDef.props;
export type ITextEditorEvents = typeof __propDef.events;
export type ITextEditorSlots = typeof __propDef.slots;

export default class TextEditor extends SvelteComponent<
	ITextEditorProps,
	ITextEditorEvents,
	ITextEditorSlots
> {}
