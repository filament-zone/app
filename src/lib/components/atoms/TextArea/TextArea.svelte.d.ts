import type { Component } from 'svelte';

export interface ITextAreaProps extends Partial<HTMLTextAreaElement> {
	label?: string | null;
	error?: string;
}

export declare const TextArea: Component<ITextAreaProps>;
export default TextArea;
